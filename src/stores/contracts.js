
import { defineStore } from "pinia";
import { useWeb3Store } from "@/stores/web3";
import { useHistoryStore } from "@/stores/history";
import { ethers } from "ethers";
import { whatsabi } from "@shazow/whatsabi";
import axios from 'axios';
import qs from 'querystring';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import { createReturnStatement } from "@vue/compiler-core";

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
        async guessContract(address) {
            let contract = null;
            address = address.toLowerCase()
            console.log(address.length);
            if (address.length == 42 && address.startsWith('0x')) {
                contract = await this.getContract(address)
                return contract;
            }

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
                console.log("BYTECODE", bytecode)
                let contract = await this._loadContractFromEtherscan(address);
                if (contract == null) {
                    contract = {}
                    console.log("ETHERSCAN FAILED")
                    const tempabi = whatsabi.abiFromBytecode(bytecode);
                    let ABI = []
                    const signatureReturn = await axios.get(`https://sig.eth.samczsun.com/api/v1/signatures?${qs.stringify({ function: tempabi.filter(function (a) { return a.type == "function" }).map(function (a) { return a.selector }), event: tempabi.filter(function (a) { return a.type == "event" }).map(function (a) { return a.hash }) })}`);
                    console.log(signatureReturn.data.result)
                    for (const ev of Object.values(signatureReturn.data.result.event)) {
                        if (ev.length > 0) {
                            console.log(ev)
                            ABI.push("event " + ev[0].name)
                        }
                    }
                    for (const fnc of Object.values(signatureReturn.data.result.function)) {
                        if (fnc.length > 0) {
                            ABI.push("function " + fnc[0].name)
                        }
                    }
                    /*
                    const signatureLookup = new whatsabi.loaders.Byte4SignatureLookup();
                    for (const abiObj of tempabi) {
                        console.log(abiObj)
                        if (abiObj.type == "function") {
                            let fnc = await signatureLookup.loadFunctions(abiObj.selector)
                            if (fnc.length > 0) {
                                console.log(fnc[0])
                                ABI.push("function " + fnc[0])
                            }
                        } else if (abiObj.type == "event") {
                            let ev = await signatureLookup.loadEvents(abiObj.hash);
                            if (ev.length > 0) {
                                console.log(ev[0])
                               ABI.push("function " + fnc[0])
                            }
                        }
                    }
                    */
                    ABI = ABI.map((text_signature) => `${text_signature.replaceAll('[]', '[] calldata')}`);
                    const iface = new ethers.utils.Interface(ABI);
                    let jsonAbi = iface.format(ethers.utils.FormatTypes.json);
                    console.log("FINAL ABI",  JSON.parse(jsonAbi))
                    contract.ABI = JSON.parse(jsonAbi);
                    contract.address = address;
                }
                this.$state.contracts[address.toLowerCase()] = contract;
            } else {

            }
            return this.$state.contracts[address.toLowerCase()]
        },
        async _loadContractFromEtherscan(address) {
            const web3 = useWeb3Store();
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
            obj.runs = result.Runs
            obj.constructorArguments = result.ConstructorArguments
            obj.EVMVersion = result.EVMVersion
            obj.library = result.Library
            obj.licenseType = result.LicenseType
            obj.proxy = result.Proxy
            obj.implementation = result.Implementation
            obj.swarmSource = result.SwarmSource
            console.log(obj)
            if (obj.implementation != null && obj.implementation != "") {
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
            obj.ABI = obj.ABI.sort((a, b) => typeof a.name == 'string' ? a.name.localeCompare(b.name) : false)
            let eventCount = 1;
            let functionCount = 1;

            for (let index = 0; index < obj.ABI.length; index++) {
                if (obj.ABI[index].type == "event") {
                    obj.ABI[index].signature = web3.web3.eth.abi.encodeEventSignature(obj.ABI[index])
                    obj.ABI[index].id = eventCount++;
                } else if (obj.ABI[index].type != "constructor") {
                    obj.ABI[index].id = functionCount++;
                }
            }
            return obj;
        },
        async callContract(address, func, params, from, blockNumber = "latest", value = "0") {
            const web3 = useWeb3Store();
            const history = useHistoryStore();
            var ctx = await web3.getContract(address, this.$state.contracts[address.toLowerCase()].ABI);
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
                console.log("RES", res)
                history.pushCallResult(counter, null, res)
            } catch (e) {
                history.pushCallResult(counter, JSON.parse(JSON.stringify(e)), null)
            }
        },
        async sendContract(address, func, params, value = "0") {
            const web3 = useWeb3Store();
            const history = useHistoryStore();
            var ctx = await web3.getContract(address, this.$state.contracts[address.toLowerCase()].ABI);
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
        }
    },
});
