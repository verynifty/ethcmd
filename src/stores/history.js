
import { defineStore } from "pinia";

export const useHistoryStore = defineStore({
    id: "history",
    state: () => ({
        history: [],
        callCounter: 0
    }),
    getters: {
        contractHistory: function() {
            return this.$state.history;
        }
    },
    actions: {
        async addCall(callCounter, address, func, params, calldata, block) {
            this.$state.history.unshift({
                address: address.toLowerCase(),
                func: func,
                params: params,
                calldata: calldata,
                callCounter: callCounter,
                block: block,
                result: null,
                error: null,
                type: "Read"
            })
        },
        async pushResult(callCounter, error, result) {
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
        },
        getCallCOunter() {
            this.$state.callCounter++;
            return this.$state.callCounter; 
        }
    },
});
