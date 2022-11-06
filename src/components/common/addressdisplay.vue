<template>
   <router-link :to="{ name: 'addressinfos', params: { address: value }}">{{ format() }}</router-link>
</template>

<script setup>
    const props = defineProps(["value"]);

    let known_addresses = {
        "0xdac17f958d2ee523a2206206994597c13d831ec7": {
            name: "Tether",
            tags: ["ERC20", "StableCoin"]
        },
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
            name: "WETH",
            tags: ["ERC20"]
        },
        "0x7a250d5630b4cf539739df2c5dacb4c659f2488d": {
            name: "UniswapV2Router",
            tags: ["Uniswap"]
        },
        "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45": {
            name: "UniswapV3Router",
            tags: ["Uniswap"]
        },
        "0x00000000006c3852cbef3e08e8df289169ede581": {
            name: "Seaport",
            tags: []
        },
        "0x1111111254fb6c44bac0bed2854e76f90643097d": {
            name: "1inch",
            tags: []
        },
        "0x283af0b28c62c092c9727f1ee09c02ca627eb7f5": {
            name: "ENS",
            tags: []
        },
        "0x74312363e45dcaba76c59ec49a7aa8a65a67eed3": {
            name: "X2Y2",
            tags: []
        },
        "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
            name: "USDC",
            tags: ["ERC20", "StableCoin"]
        },
        "0x881d40237659c251811cec9c364ef91dc08d300c": {
            name: "MetamaskRouter",
            tags: []
        },
        "0x4dbd4fc535ac27206064b68ffcf827b0a60bab3f": {
            name: "Arbitrum Birdge",
            tags: []
        },
        "0x000000000000ad05ccc4f10045630fb830b95127": {
            name: "Blur.io",
            tags: []
        },
        "0x0000000000c2d145a2526bd8c716263bfebe1a72": {
            name: "NFT bulk transfer",
            tags: []
        },
        "0x5e4e65926ba27467555eb562121fac00d24e9dd2": {
            name: "Optimism Sequencer",
            tags: []
        },
        "0x39da41747a83aee658334415666f3ef92dd0d541": {
            name: "Blur.io swap",
            tags: []
        },
        "0xe66b31678d6c16e9ebf358268a790b763c133750": {
            name:"Coinbase Wallet Proxy",
            tags: []
        }
    }

    function format() {
        if (known_addresses[props.value.toLowerCase()] != null)
        {
            return known_addresses[props.value.toLowerCase()].name;
        }
        return (props.value.substring(0, 6) + '...' + (props.value.slice(-6)))
    }
</script>
