import { defineStore } from "pinia";

import Web3 from 'web3';
import { ethers, providers } from "ethers";

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider/dist/umd/index.min.js";

import { unref, toRaw } from 'vue'

let pastProvider = null

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
        ethers: null,
        chainId: null
    }),
    getters: {
        accountShort: function (state) {
            return (state.account.substring(0, 6) + '...' + state.account.slice(-6))
        },
        currentChainId: function (state) {
            return state.chainId;
        }
    },
    actions: {
        getEthers: function () {
            return (toRaw(this.ethers))
        },
        async setWeb3(opt = {}) {
            console.log("setWeb3")
            if (opt.tryFromCache == true && web3Modal.cachedProvider) {
                console.log("Try connect from cache");
                await this.connect();
            }
            console.log("SET WEB3")
            let RPC_URL = process.env.RPC_URL;
            // TOOD make this better later
            //console.log("www", web3Modal.cachedProvider, opt)
            if (this.web3 != null && this.account != null) {
                this.chainId = (await this.getEthers().getNetwork()).chainId
                return;
            } else if (this.web3 == null && this.account == null) {
                this.ethers = new ethers.providers.JsonRpcProvider(RPC_URL)
                this.web3 = new Web3(
                    new Web3.providers.HttpProvider(
                        RPC_URL
                    )
                );
            } else {
                await this.connect();
            }
            this.chainId = (await this.getEthers().getNetwork()).chainId
        },
        async chainChangedCallback(chainId)  {
            try {
                console.log("chainChanged", parseInt(chainId));
                this.connect();
                this.chainId = parseInt(chainId)
            } catch (error) {
                console.log("ERROR", error)
            }
        },
        async connect() {
            if (pastProvider != null) {
                console.log("THERE IS A PAST PROVIDER", pastProvider)
                pastProvider.removeListener("chainChanged", this.chainChangedCallback)
                pastProvider = null
            }
            const provider = await web3Modal.connect();
            const ethersProvider = new providers.Web3Provider(provider)
            const userAddress = await ethersProvider.getSigner().getAddress()
            // console.log(ethersProvider)
            this.ethers = ethersProvider;
            this.web3 = new Web3(provider);
            this.account = userAddress

            provider.on("accountsChanged", (accounts) => {
                this.connect();
                console.log("accountsChanged");
            });

            // Subscribe to chainId change
            provider.on("chainChanged", this.chainChangedCallback);

            // Subscribe to provider disconnection
            provider.on("connect", (error) => {
                console.log("CONNECT");
            });

            // Subscribe to provider disconnection
            provider.on("disconnect", (error) => {
                console.log("disconnected");
                this.connect();
            });
            pastProvider = provider;
        },
        async getContract(address, ABI) {
            let ct = (new ethers.Contract(address, ABI, toRaw(this.ethers)));
            ct = ct.connect(toRaw(this.ethers).getSigner())
            return toRaw(ct);
        },
        async disconnect() {
            let RPC_URL = process.env.RPC_URL;
            this.account = null;
            this.ethers = new ethers.providers.JsonRpcProvider(RPC_URL)
            this.web3 = new Web3(
                new Web3.providers.HttpProvider(
                    RPC_URL
                )
            );

            console.log("disconnected");
        },


    },
});
