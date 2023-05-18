

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
import { useContractStore } from "@/stores/contracts";

const web3 = useWeb3Store();
let contracts = useContractStore();

async function setHash(a) {
  let ethers = await web3.getEthersAndConnect();
  const hash = a.target.value;
  let tx = await ethers.getTransaction(hash);
  if (tx) {
    let contract = await contracts.getContract(tx.to);
    if (
      tx.data != null &&
      tx.data.length >= 10 &&
      contract != null &&
      !contract.unknownABI
    ) {
        console.log("GO to address page")
      await router.replace({
        name: "address",
        params: { address: tx.to },
        query: {
          function: tx.data.substring(0, 10).toLowerCase(),
          calldata: "0x" + tx.data.substring(10),
        },
      });
    } else {
      await router.replace({
        name: "intent",
        query: { data: tx.data, value: tx.value, to: tx.to },
      });
    }
  }
}

if (route.query.txHash != null && route.query.txHash != "") {
  setHash({ target: { value: route.query.txHash } });
}
</script>