
import { defineStore } from "pinia";
import { useWeb3Store } from "@/stores/web3";
import { useHistoryStore } from "@/stores/history";

import axios from 'axios';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

async function _loadContractFromEtherscan(address) {
    let etherscan = process.env.ETHERSCAN_API_KEY;
    // We try to get it from Etherscan
    let rSourceCode = await axios.get(
        process.env.ETHERSCAN_API + `/api?module=contract&action=getsourcecode&address=${address}&apikey=${etherscan}`
    );
    let result = rSourceCode.data.result[0];
    console.log(rSourceCode)
    let obj = {}
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
        obj.implementationContract = await _loadContractFromEtherscan(obj.implementation);
        for (const abiFunc of obj.implementationContract.ABI) {
            let f = abiFunc;
            f.proxyImplementation = true;
            obj.ABI.push(f)
        }
    } else {
        obj.implementation = null;
    }
    obj.ABI = obj.ABI.sort((a, b) => typeof a.name == 'string' ? a.name.localeCompare(b.name) : false)
    return obj;
}

export const useContractStore = defineStore({
    id: "contracts",
    state: () => ({
        contracts: {},
    }),
    getters: {
        // doubleCount: (state) => state.counter * 2,
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
            if (ABI == null) {
                this.$state.contracts[address.toLowerCase()] = await _loadContractFromEtherscan(address)
            } else {

            }
            return this.$state.contracts[address.toLowerCase()]

        },
        async callContract(address, func, params, blockNumber = "latest") {
            const web3 = useWeb3Store();
            const history = useHistoryStore();

            var ctx = new web3.web3.eth.Contract(this.$state.contracts[address.toLowerCase()].ABI, address);
            let callParams = []
            for (const p of params) {
                callParams.push(p.value)
            }
            let counter = history.getCallCOunter()
            console.log(counter)
            let block = await web3.web3.eth.getBlock(blockNumber);
            let res = ctx.methods[func.name](...callParams).call({}, function (error, result) {
                try {
                    console.log("PUSH RESULT, ", counter, error, result)
                    history.pushCallResult(counter, error, result)
                } catch (err) {
                    console.log(err)
                }

            })
            // console.log("RESULT", res)
            history.addCall(counter, address, func, callParams, block)
        },
        async sendContract(address, func, params, blockNumber = "latest") {
            const web3 = useWeb3Store();
            const history = useHistoryStore();

            var ctx = new web3.web3.eth.Contract(this.$state.contracts[address.toLowerCase()].ABI, address);
            let callParams = []
            for (const p of params) {
                callParams.push(p.value)
            }
            let counter = history.getCallCOunter()
            console.log(counter)
            let block = await web3.web3.eth.getBlock(blockNumber);
            console.log(web3.account)
            let bb = await ctx.methods[func.name](...callParams).send({
                from: web3.account
            }, function (error, hash) {
                console.log("HASH", hash)
                history.addSend(counter, address, func, callParams, block, hash)
            });
            console.log("BBBB", bb)
            /*{}, function (error, result) {
                try {
                    // console.log("PUSH RESULT, ", counter, error, result)
                    history.pushResult(counter, error, result)
                } catch (err) {
                    console.log(err)
                }

            })
            */
            // console.log("RESULT", res)
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
