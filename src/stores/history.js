
import { defineStore } from "pinia";

export const useHistoryStore = defineStore({
    id: "history",
    state: () => ({
        history: [],
        callCounter: 0
    }),
    getters: {
        contractHistory: (state) => (address) => {
            return state.history.filter(h => h.address === address)
        }
    },
    actions: {
        save() {
            localStorage.setItem("HistoryCallsAndSend", JSON.stringify(this.$state.history))
            localStorage.setItem("CallCounter", this.$state.callCounter)
        },
        load() {
            let cache = localStorage.getItem("HistoryCallsAndSend");
            let callCounter = localStorage.getItem("CallCounter");

            this.$state.history = cache == null ? [] : JSON.parse(cache);
            this.$state.callCounter = callCounter == null ? 0 : parseInt(callCounter);
        },
        async addCall(callCounter, address, func, params, block) {
            this.$state.history.unshift({
                address: address.toLowerCase(),
                func: func,
                params: params,
                callCounter: callCounter,
                blockNumber: block.blockNumber,
                timestamp: block.timestamp,
                result: null,
                error: null,
                type: "Read"
            })
            this.save()
        },
        async addSend(callCounter, address, func, params, block, hash) {
            this.$state.history.unshift({
                address: address.toLowerCase(),
                func: func,
                params: params,
                callCounter: callCounter,
                blockNumber: block.blockNumber,
                timestamp: block.timestamp,
                result: null,
                error: null,
                type: "Send",
                hash: hash
            })
            this.save()
        },
        async pushCallResult(callCounter, error, result) {
            console.log(this.$state.history)
            let index = 0
            for (const e of this.$state.history) {
                if (e.callCounter == callCounter) {
                    console.log("FOUND", true)
                    break
                }
                index++;
                console.log(false, index)
            }
            //let index = this.$state.history.findIndex((e) => {e.callCounter == callCounter } )
            if (error) {
                console.log("ERRRROOOR", error.toString().toString(), error)
                this.$state.history[index].error = error
            } else {
                if (Array. isArray(result)) {
                    console.log("LENGHT", result)
                    this.$state.history[index].result = []
                    for (const i of result) {
                        this.$state.history[index].result.push(i.toString())
                    }
                    console.log(this.$state.history[index].result)
                }
                else if (typeof result === 'object') {
                    this.$state.history[index].result = [result.toString()]
                }  
                else {
                    this.$state.history[index].result = [result];
                }
            }
            this.save()
        },
        async pushSendResult(callCounter, error, result) {
            console.log(this.$state.history)
            let index = 0
            for (const e of this.$state.history) {
                if (e.callCounter == callCounter) {
                    console.log("FOUND", true)
                    break
                }
                index++;
                console.log(false, index)
            }
            //let index = this.$state.history.findIndex((e) => {e.callCounter == callCounter } )
            console.log("RES", index, callCounter, error, result)
            this.$state.history[index].result = result;
            this.save()
        },
        getCallCOunter() {
            this.$state.callCounter++;
            return this.$state.callCounter;
        }
    },
});
