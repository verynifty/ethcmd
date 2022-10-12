import { defineStore } from "pinia";

import Web3 from 'web3';
import { ethers, providers } from "ethers";

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider/dist/umd/index.min.js";

import { unref, toRaw } from 'vue'


const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: "INFURA_ID", // required
        },
    },
};

const web3Modal = new Web3Modal({
    network: "rinkeby", // optional
    cacheProvider: true, // optional
    providerOptions, // required
});

export const useWeb3Store = defineStore({
    id: "web3",
    state: () => ({
        web3: null,
        account: null,
    }),
    getters: {
        accountShort: function(state) {
            return (state.account.substring(0,6) + '...' + state.account.slice(-6))
        },

    },
    actions: {
        getEthers: function() {
            return (toRaw(this.ethers))
        },
        async setWeb3(opt = {}) {
            if (opt.tryFromCache == true && web3Modal.cachedProvider) {
                console.log("Try connect from cache");
                await this.connect();
            }
            console.log("SET WEB3")
            // TOOD make this better later
            //console.log("www", web3Modal.cachedProvider, opt)
            if (this.web3 != null && this.account != null) {
                return;
            } else if (this.web3 == null && this.account == null) {
                this.ethers = new ethers.providers.JsonRpcProvider(`https://nodes.mewapi.io/rpc/eth`)
                this.web3 = new Web3(
                    new Web3.providers.HttpProvider(
                        `https://nodes.mewapi.io/rpc/eth`
                    )
                );
            } else {
                await this.connect();
            }

        },

        async connect() {
            const provider = await web3Modal.connect();
            const ethersProvider = new providers.Web3Provider(provider)
            const userAddress = await ethersProvider.getSigner().getAddress()
            console.log(ethersProvider)
            this.ethers = ethersProvider;
            this.web3 = new Web3(provider);
            this.account = userAddress


            provider.on("accountsChanged", (accounts) => {
                this.connect();
                console.log("accountsChanged");
            });

            // Subscribe to chainId change
            provider.on("chainChanged", (chainId) => {
                console.log("chainChanged", chainId);
                this.connect();
            });

            // Subscribe to provider disconnection
            provider.on("connect", (error) => {
                console.log("CONNECT");
            });

            // Subscribe to provider disconnection
            provider.on("disconnect", (error) => {
                console.log("disconnected");
                this.connect();
            });
        },
        async getContract(address, ABI) {
            console.log(this.ethers)
            return (new ethers.Contract(address, ABI, toRaw(this.ethers)));
        },
        async disconnect() {
            let web3 = new Web3(
                new Web3.providers.WebsocketProvider(
                    `wss://rinkeby.infura.io/ws/v3/446f8b2b102f40b58ce0fb2a8483209a`
                )
            );
            this.account = null;
            this.web3 = web3;

            console.log("disconnected");
        },


    },
});
