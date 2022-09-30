
import { defineStore } from "pinia";
import { useWeb3Store } from "@/stores/web3";
import { useHistoryStore } from "@/stores/history";

import axios from 'axios';

async function _loadContractFromEtherscan(address) {
    let etherscan = "BJHUCAG1SPHZ5FNA1WR5ZNXVB8X5D6QU1V"
    // We try to get it from Etherscan
    let rSourceCode = await axios.get(
        `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=${etherscan}`
    );
    let result = rSourceCode.data.result[0];
    console.log(rSourceCode)
    let obj = {}
    obj.ABI = JSON.parse(result.ABI)
    obj.address = address;
    obj.sourceCode = JSON.parse(result.SourceCode.substring(1).slice(0, -1));
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
        obj.implementationContract = await _loadContract(context, obj.implementation);
    } else {
        obj.implementation = null;
    }
    console.log("CONTRACT RESULT", obj)
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
                    // console.log("PUSH RESULT, ", counter, error, result)
                    history.pushResult(counter, error, result)
                } catch (err) {
                    console.log(err)
                }

            })
            // console.log("RESULT", res)
            history.addCall(counter, address, func, callParams, res, block)
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
            let res = ctx.methods[func.name](...callParams).call({}, function (error, result) {
                try {
                    // console.log("PUSH RESULT, ", counter, error, result)
                    history.pushResult(counter, error, result)
                } catch (err) {
                    console.log(err)
                }

            })
            // console.log("RESULT", res)
            history.addCall(counter, address, func, callParams, res, block)
        }
    },
});
