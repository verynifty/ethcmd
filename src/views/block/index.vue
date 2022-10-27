<template>
  <div class="block h-full">
      index
      <div v-if="block != null">
      <TransactionList :transactions="block.transactions" />
      </div>
      {{block}}
  </div>
</template>
<script setup>

import TransactionList from "@/components/transaction/transactionList.vue";

import { useRoute } from "vue-router";
import { ref, unref, onMounted } from "vue";
import { useWeb3Store } from "@/stores/web3";

const route = useRoute();
const blockNumber = parseInt(route.params.blocknumber)

const web3 = useWeb3Store();
const ethers = await web3.getEthersAndConnect();

const block = await ethers.getBlockWithTransactions(blockNumber);

</script>

<style>
</style>
