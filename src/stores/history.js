
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
        },
        load() {
            let cache = localStorage.getItem("HistoryCallsAndSend");
            this.$state.history = cache == null ? [] : JSON.parse(cache);
            this.$state.callCounter = cache == 0 ? 0 : this.$state.callCounter + 1;
        },
        async addCall(callCounter, address, func, params, block) {
            this.$state.history.unshift({
                address: address.toLowerCase(),
                func: func,
                params: params,
                callCounter: callCounter,
                block: block,
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
                block: block,
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
            console.log("RES", index, callCounter, error, result)
            if (error) {
                this.$state.history[index].error = error;
            } else {
                this.$state.history[index].result = result;
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
