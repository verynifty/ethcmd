
import { defineStore } from "pinia";

export const useFavoritesStore = defineStore({
    id: "favorites",
    state: () => ({
        contracts: {},
    }),
    getters: {
       
    },
    actions: {
        load: function() {
            let cache = localStorage.getItem("FavContracts");
            console.log(cache)
            this.$state.contracts = cache == null ? {} : JSON.parse(cache);
        },
        saveContracts: function() {
            console.log(this.$state.contracts)
            localStorage.setItem("FavContracts", JSON.stringify(this.$state.contracts))
        },
        isFavoriteContract: function(address) {
            console.log("isFavoriteContract", address)
            return this.$state.contracts[address.toLowerCase()] != null;
        },
        addFavoriteContract(address, name) {
            this.removeFavoriteContract(address);
            this.$state.contracts[address.toLowerCase()] = {
                name: name,
                address: address.toLowerCase()
            }
            this.saveContracts()
        },
        removeFavoriteContract(address) {
            this.$state.contracts[address.toLowerCase()] = null;
            delete this.$state.contracts[address.toLowerCase()]
            this.saveContracts()
        }
    },
});
