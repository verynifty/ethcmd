
import { defineStore } from "pinia";
import { useWeb3Store } from "@/stores/web3";
import { useHistoryStore } from "@/stores/history";
import { ethers } from "ethers";
import { whatsabi } from "@shazow/whatsabi";
import axios from 'axios';
import qs from 'querystring';
import JSZip, { filter } from 'jszip';
import FileSaver from 'file-saver';
import { createReturnStatement } from "@vue/compiler-core";
import { guessAbiEncodedData, guessFragment } from '@samczsun/abi-guesser/dist/encode-guesser';

function getBlockNumber(x, base) {
    const parsed = Number.parseInt(x, base);
    if (Number.isNaN(parsed)) {
        return "latest";
    }
    return parsed;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

export const useContractStore = defineStore({
    id: "contracts",
    state: () => ({
        contracts: {},
    }),
    getters: {
        contractEvents: (state) => (address) => {
            return state.contracts[address.toLowerCase()].ABI.filter(h => h.type === 'event' && h.proxyImplementation != true)
        },
        contractAndProxyEvents: (state) => (address) => {
            return state.contracts[address.toLowerCase()].ABI.filter(h => h.type === 'event')
        }
    },
    actions: {
        async getABIFromAddress(address) {
            let ct = await this.getContract(address);
            return ct.ABI;
        },
        async guessContract(address) {
            let contract = null;
            address = address.toLowerCase()
            if (address.length == 42 && address.startsWith('0x')) {
                contract = await this.getContract(address)
                return contract;
            }
        },
        async getContractEvents(address) {
            let ct = await this.getContract(address);
            let res = {}
            console.log(ct.ABI)
            for (const e of ct.ABI.filter((i) => { return i.type == "event" })) {
                res[e.signature] = e;
            }
            return res;
        },
        async getContract(address, ABI) {
            if (this.$state.contracts[address.toLowerCase()] != null) {
                return this.$state.contracts[address.toLowerCase()]
            }
            const web3 = useWeb3Store();
            while (web3.getEthers() == null) {
                await sleep(500);
            }
            if (ABI == null) {
                let bytecode = await web3.getEthers().getCode(address);
                // DO something if bytecode is empty
                let contract = null;
                try {
                    contract = await this._loadContractFromEtherscan(address);
                } catch (error) {
                    console.log("Error fetching from Etherscan", error)
                }
                if (contract == null) {
                    try {
                        contract = await this._loadContractFromSourcify(address);
                    } catch (error) {
                        console.log("Error fetching from Sourcify", error)
                    }
                }
                if (contract == null) {
                    contract = {}
                    contract.unknownABI = true;
                    console.log("ETHERSCAN FAILED")
                    const tempabi = whatsabi.abiFromBytecode(bytecode);
                    let ABI = []
                    const signatureReturn = await axios.get(`https://sig.eth.samczsun.com/api/v1/signatures?${qs.stringify({ function: tempabi.filter(function (a) { return a.type == "function" }).map(function (a) { return a.selector }), event: tempabi.filter(function (a) { return a.type == "event" }).map(function (a) { return a.hash }) })}`);
                    for (const ev of Object.values(signatureReturn.data.result.event)) {
                        if (ev.length > 0) {
                            ABI.push("event " + ev[0].name)
                        }
                    }
                    for (const fnc of Object.values(signatureReturn.data.result.function)) {
                        if (fnc.length > 0) {
                            ABI.push("function " + fnc[0].name + " view returns (bytes)")
                        }
                    }
                    ABI = ABI.map((text_signature) => `${text_signature.replaceAll('[]', '[] calldata')}`);
                    const iface = new ethers.utils.Interface(ABI);
                    let jsonAbi = JSON.parse(iface.format(ethers.utils.FormatTypes.json));
                    /*
                    for (let index = 0; index < jsonAbi.length; index++) {
                        jsonAbi[index].stateMutability = "view";
                        jsonAbi[index].constant = true;

                    }
                    */
                    contract.ABI = jsonAbi;
                    contract.address = address;
                    contract.contractInformations = "Guessed"
                }
                contract.ABI = contract.ABI.sort((a, b) => typeof a.name == 'string' ? a.name.localeCompare(b.name) : false)
                let eventCount = 1;
                let functionCount = 1;
                if (contract.name == null) {
                    contract.name = "Unknown contract"
                }
                for (let index = 0; index < contract.ABI.length; index++) {
                    console.log(contract.ABI[index].type);
                    if (contract.ABI[index].type == "event") {
                        contract.ABI[index].signature = web3.web3.eth.abi.encodeEventSignature(contract.ABI[index])
                        contract.ABI[index].id = eventCount++;
                    } else if (contract.ABI[index].type != "constructor") {
                        delete contract.ABI[index].gas
                        contract.ABI[index].id = functionCount++;
                        if (contract.ABI[index].type == "function") {
                            contract.ABI[index].signature = web3.web3.eth.abi.encodeFunctionSignature(contract.ABI[index])
                           // console.log("Signature", contract.ABI[index].signature)
                        }
                    }
                }
                this.$state.contracts[address.toLowerCase()] = contract;
            } else {

            }
            return this.$state.contracts[address.toLowerCase()]
        },
        async _loadContractFromSourcify(address) {
            const networkId = parseInt(process.env.CHAINID);
            address = address.toLowerCase()
            let obj = {}
            const sourcifyResp = await axios.get(`https://sourcify.dev/server/files/any/${networkId}/${address}`)
            let metadata = JSON.parse((sourcifyResp.data.files.filter((f) => f.name == "metadata.json"))[0].content);
            obj.ABI = metadata.output.abi;
            obj.address = address;
            obj.compilerVersion = metadata.compiler.version;
            obj.language = metadata.language;
            obj.optimizationUsed = metadata.settings.optimizer.enabled;
            obj.optimizationRuns = metadata.settings.optimizer.runs;
            obj.library = metadata.settings.libraries;
            obj.sourceCode = { sources: {} }
            for (const file of sourcifyResp.data.files.filter((f) => f.name != "metadata.json")) {
                obj.sourceCode.sources[file.name] = file;
            }
            obj.contractInformations = "Sourcify"
            return obj
        },
        async _loadContractFromEtherscan(address) {
            let etherscan = process.env.ETHERSCAN_API_KEY;
            // We try to get it from Etherscan
            let rSourceCode = await axios.get(
                process.env.ETHERSCAN_API + `/api?module=contract&action=getsourcecode&address=${address}&apikey=${etherscan}`
            );
            let result = rSourceCode.data.result[0];
            console.log(rSourceCode)
            let obj = {}
            if (result.ABI == "Contract source code not verified") {
                return null;
            }
            obj.ABI = JSON.parse(result.ABI)
            obj.address = address;
            if (result.SourceCode.startsWith('{{')) {
                obj.sourceCode = JSON.parse(result.SourceCode.substring(1).slice(0, -1));
            } else {
                let key = result.ContractName + ".sol"
                obj.sourceCode = { sources: {} }
                obj.sourceCode.sources[key] = {
                    "content": result.SourceCode
                }
            }
            obj.name = result.ContractName;
            obj.compilerVersion = result.CompilerVersion
            obj.optimizationUsed = result.OptimizationUsed
            obj.optimizationRuns = result.Runs
            obj.constructorArguments = result.ConstructorArguments
            obj.EVMVersion = result.EVMVersion
            obj.library = result.Library
            obj.licenseType = result.LicenseType
            obj.proxy = result.Proxy
            obj.swarmSource = result.SwarmSource
            obj.implementation = result.Implementation
            if (obj.implementation != null && obj.implementation != "" && obj.implementation.toLowerCase() != address) {
                console.log(obj)
                console.log("Loading proxy implementation at ", obj.implementation);
                obj.implementationContract = await this.getContract(obj.implementation);
                for (const abiFunc of obj.implementationContract.ABI) {
                    let f = Object.assign({}, abiFunc);
                    f.proxyImplementation = true;
                    obj.ABI.push(f)
                }
            } else {
                obj.implementation = null;
            }
            obj.contractInformations = "Etherscan"
            return obj;
        },
        async callContract(address, func, params, from, blockNumber = "latest", value = "0") {
            const web3 = useWeb3Store();
            const history = useHistoryStore();
            const contract = await this.getContract(address)
            var ctx = await web3.getContract(address, [func]);
            console.log(contract)
            let callParams = []
            for (const p of params) {
                callParams.push(p.value)
            }
            let counter = history.getCallCOunter()
            let block = await web3.getEthers().getBlock(getBlockNumber(blockNumber));
            history.addCall(counter, address, func, callParams, block)
            try {
                let res = await ctx[func.name](...callParams, {
                    blockTag: getBlockNumber(blockNumber),
                    from: from,
                    value: value
                })
                if (contract.unknownABI) {
                    let guessedABI = guessAbiEncodedData(res);
                    console.log("GUESSED ABI", guessedABI)
                }
                console.log(res)
                history.pushCallResult(counter, null, res)
            } catch (e) {
                console.log(e)
                history.pushCallResult(counter, JSON.parse(JSON.stringify(e)), null)
            }
        },
        async sendContract(address, func, params, value = "0") {
            const web3 = useWeb3Store();
            const history = useHistoryStore();
            var ctx = await web3.getContract(address, [func]);
            let callParams = []
            for (const p of params) {
                callParams.push(p.value)
            }
            let counter = history.getCallCOunter()
            let block = await web3.getEthers().getBlock(getBlockNumber("latest"));
            let tx = await ctx[func.name](...callParams,
                {
                    from: web3.account,
                    value: value
                })
            history.addSend(counter, address, func, params, block, tx.hash)
            let txReceipt = await tx.wait()
            history.pushSendResult(counter, null, txReceipt)
        },
        async downloadSources(address) {
            const zip = new JSZip();
            let ct = this.$state.contracts[address.toLowerCase()];
            let srcs = ct.sourceCode.sources;
            for (const path in srcs) {
                if (Object.hasOwnProperty.call(srcs, path)) {
                    const element = srcs[path];
                    zip.file(path, element.content)
                }
            }
            zip.generateAsync({ type: 'blob' }).then(function (content) {
                FileSaver.saveAs(content, ct.name + '.zip');
            });
        },
        async getEvents(address, topic0 = "any") {
            return this._getEventsFromEthersJS(address, topic0)
        },
        async decodeTransaction(address, data) {
            const iface = new ethers.utils.Interface(await this.getABIFromAddress(address));
            return iface.decodeFunctionData({
                data: data,
            })
        },
        async decodeConstructor(address, data) {
            try {
                let constructor = await this.getConstructor(address);
                let res = ethers.utils.defaultAbiCoder.decode(
                    constructor.inputs.map(x => x.type),
                    data
                )
                return res;
            } catch (error) {
                return null;
            }
        },
        async getConstructor(address) {
            let abi = await this.getABIFromAddress(address);
            let constructor = abi.find(e => e.type == 'constructor');
            return constructor;
        },
        async ABItoHuman(abi) {
            if (abi == null) {
                return null;
            }
            const iface = new ethers.utils.Interface([abi]);
            return (iface.format(ethers.utils.FormatTypes.full)[0]);
        },
        async getEventsDecoded(address, topic0 = "any") {
            let events = await this.getEvents(address, topic0);
            const iface = new ethers.utils.Interface(await this.getABIFromAddress(address));
            events = events.map(function (log) {
                let decoded = iface.parseLog(log)
                if (log.timeStamp) {
                    log.timestamp = parseInt(log.timeStamp);
                } else {
                    log.timestamp = 0;
                }
                log.blockNumber = parseInt(log.blockNumber);
                log.name = decoded.name;
                log.args = [];
                for (const a of decoded.args) {
                    log.args.push(a)
                }
                return log;
            });
            return events;
        },
        async _getEventsFromEtherscan(address, topic0) {
            let counter = 1;
            const perPage = 10000;
            let etherscan = process.env.ETHERSCAN_API_KEY;
            let result = [];
            while (true) {
                // We try to get it from Etherscan
                let params = {
                    address: address.toLowerCase(),
                    apikey: etherscan,
                    module: "logs",
                    action: "getLogs",
                    offset: perPage,
                    page: counter
                }
                if (topic0 != null && topic0 != "any") {
                    params.topic0 = topic0
                }
                let eResp = await axios.get(
                    process.env.ETHERSCAN_API + `/api?${qs.stringify(params)}`
                );
                result = result.concat(eResp.data.result)
                counter++;
                if (eResp.data.result.length != perPage) {
                    break;
                }
            }
            return result;
        },
        async _getEventsFromEthersJS(address, topics, fromBlock = 0, toBlock = "latest") {
            console.log("fetch events", fromBlock, toBlock)
            const web3 = useWeb3Store();
            const ethersInstance = web3.getEthers();
            try {
                let filter = {
                    fromBlock: fromBlock,
                    toBlock: toBlock,
                    address: address,
                    topics: topics
                };
                console.log(filter)
                let result = await ethersInstance.getLogs(filter)
                console.log("LOGS RESULT", result)
                return result;
            } catch (error) {
                console.log("error", error)
                let newToBlock =
                    toBlock == "latest" ? await ethersInstance.getBlockNumber("latest") : toBlock;
                const result = await Promise.all([
                    this._getEventsFromEthersJS(
                        address,
                        topics,
                        fromBlock,
                        fromBlock + parseInt((newToBlock - fromBlock) / 2)
                    ),
                    this._getEventsFromEthersJS(
                        address,
                        topics,
                        fromBlock + parseInt((newToBlock - fromBlock) / 2) + 1,
                        newToBlock
                    ),
                ]);
                return ([...result[0], ...result[1]]);
            }
        },
    }
});
