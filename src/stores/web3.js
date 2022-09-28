
import { defineStore } from "pinia";

import Web3 from 'web3';

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider/dist/umd/index.min.js";

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
        // doubleCount: (state) => state.counter * 2,
    },
    actions: {
        async setWeb3(opt = {}) {
            console.log("SET WEB3")
            // TOOD make this better later
            //console.log("www", web3Modal.cachedProvider, opt)
            if (this.web3 != null && this.account != null) {
                return;
            } else if (this.web3 == null && this.account == null) {
                this.web3 = new Web3(
                    new Web3.providers.HttpProvider(
                        `https://nodes.mewapi.io/rpc/eth`
                    )
                );
            } else {
                await this.connect();
            }
            if (opt.tryFromCache == true && web3Modal.cachedProvider) {
                console.log("Try connect from cache");
                await this.connect();
            }
        },

        async connect() {
            const provider = await web3Modal.connect();
            this.web3 = new Web3(provider);
            let accounts = await this.web3.eth.getAccounts();
            this.account = accounts[0];
            console.log(`connected as ${this.account}`);

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
