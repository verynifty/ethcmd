

<template>
  <div class="">
    <a
      v-if="web3.account"
      @click="disconnect()"
      target="_blank"
      class="
        text-gray-300
        hover:bg-gray-700 hover:text-white
        block
        px-3
        py-2
        rounded-md
        text-base
        font-medium
      "
      >{{ web3.account }}</a
    >
    <a
      v-else
      @click="startWeb3"
      class="
        text-gray-300
        hover:bg-gray-700 hover:text-white
        block
        px-3
        py-2
        rounded-md
        text-base
        font-medium
      "
      >Connect wallet</a
    >
  </div>
</template>

<script setup>
console.log("COnn")
import { useWeb3Store } from "@/stores/web3";
const web3 = useWeb3Store();
// console.log("store ", web3);
async function startWeb3() {
  web3.setWeb3();
}
function disconnect() {
  web3.disconnect();
}
</script>

<style scoped>
</style>
