<template>
  <a :href="'/block/' + blockNumber">
    @{{ blockNumber }}
    <span v-if="time != 0">
        (<timeago class="ml-1" :autoUpdate="30" :datetime="time * 1000" />)
    </span>
  </a>
</template>

<script setup>
import { ref } from "vue";

import { useWeb3Store } from "@/stores/web3";

const web3 = useWeb3Store();

let time = ref(0)

const props = defineProps(["blockNumber", "timestamp"]);
if (props.timestamp == null || props.timestamp == 0) {
    let ethers = await web3.getEthers();
    let block = await ethers.getBlock(props.blockNumber)
    time.value = block.timestamp;
} else {
    time.value = parseInt(props.timestamp);
}
</script>