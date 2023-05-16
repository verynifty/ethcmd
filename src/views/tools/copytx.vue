

<template>
  <div class="h-full bg-gray-100 overflow-scroll p-10">
    <h1 class="text-2xl font-bold mb-2">Copy an existing transaction</h1>

    <p class="mb-5">
      Paste an existing transaction hash and we'll redirect you to a new page
      where you'll be able to send the same transaction.
    </p>
    <div>
      <label for="ether" class="block text-sm font-medium text-gray-700"
        >Transaction hash</label
      >
      <div class="mt-1">
        <input
          @input="setHash"
          name="ether"
          id="ether"
          type="text"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          aria-describedby="ether-description"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
document.title = "Copy a transaction - ETHCMD";

import { ethers } from "ethers";

import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

import { useWeb3Store } from "@/stores/web3";

const web3 = useWeb3Store();

async function setHash(a) {
  let ethers = await web3.getEthers();
  const hash = a.target.value;
  let tx = await ethers.getTransaction(hash);
  if (tx) {
    router.push({
      name: "intent",
      query: { data: tx.data, value: tx.value, to: tx.to },
    });
  }
}

if (route.query.txHash != null && route.query.txHash != "") {
  let ethers = await web3.getEthersAndConnect();
  const hash = route.query.txHash;
  let tx = await ethers.getTransaction(hash);
  if (tx) {
    await router.replace({
      name: "intent",
      query: { data: tx.data, value: tx.value, to: tx.to },
    });
  }
}
</script>