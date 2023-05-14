

<template>
  <div class="h-full bg-gray-100 overflow-scroll p-10">
          <h1 class="text-2xl font-bold mb-2">Ethereum unit converter</h1>

    <p class="mb-5">
      Convert Ethereum units from their different notations such as Wei, Gwei
      and Eth.
    </p>
    <div>
      <label for="ether" class="block text-sm font-medium text-gray-700"
        >Ether</label
      >
      <div class="mt-1">
        <input
          :value="ether"
          @input="setEther"
          name="ether"
          id="ether"
          type="text"
          class="
            block
            w-full
            rounded-md
            border-gray-300
            shadow-sm
            focus:border-indigo-500 focus:ring-indigo-500
            sm:text-sm
          "
          aria-describedby="ether-description"
        />
      </div>
    </div>
    <div>
      <label for="gwei" class="mt-4 block text-sm font-medium text-gray-700"
        >Gwei (9 digits)</label
      >
      <div class="mt-1">
        <input
          :value="gwei"
          @keyup="setGwei"
          name="gwei"
          id="gwei"
          type="text"
          class="
            block
            w-full
            rounded-md
            border-gray-300
            shadow-sm
            focus:border-indigo-500 focus:ring-indigo-500
            sm:text-sm
          "
          aria-describedby="gwei-description"
        />
      </div>

    </div>
    <div>
      <label for="wei" class="mt-4  block text-sm font-medium text-gray-700"
        >Wei (18 digits)</label
      >
      <div class="mt-1">
        <input
          :value="wei"
          @keyup="setWei"
          name="wei"
          id="wei"
          type="text"
          class="
            block
            w-full
            rounded-md
            border-gray-300
            shadow-sm
            focus:border-indigo-500 focus:ring-indigo-500
            sm:text-sm
          "
          aria-describedby="wei-description"
        />
      </div>
    </div>
    <div class="mt-6">
      <h2 class="text-2xl font-bold mb-2">What are units?</h2>

       <p>Ether is the primary unit of value and is used for various purposes within the Ethereum network. However, Ethereum also has two smaller denominations: Gwei and Wei. Let's break them down:</p>

<p class="mt-2"><span class="font-bold	">Ether (ETH)</span>: Ether is the main unit of value on the Ethereum network. It is used for various transactions and operations, including transferring value between Ethereum addresses, executing smart contracts, and paying for transaction fees. Ether can be subdivided into smaller units, namely Gwei and Wei.</p>

<p class="mt-2"><span class="font-bold	">Gwei</span>: Gwei is short for "gigawei," and it is a smaller denomination of Ether. Gwei is commonly used to specify transaction fees on the Ethereum network. When you perform a transaction on Ethereum, you can set the amount of Gwei you are willing to pay as a transaction fee. Miners, who validate transactions and add them to the blockchain, are incentivized to prioritize transactions with higher fees. Gwei allows users to adjust the fee based on how quickly they want their transaction to be processed. For example, a higher Gwei value would likely result in faster transaction confirmation.</p>

<p class="mt-2"><span class="font-bold	">Wei</span>: Wei is the smallest denomination of Ether and is named after Wei Dai, a computer scientist and cryptographer. One Ether is equal to 10^18 Wei (1,000,000,000,000,000,000 Wei). While Ether and Gwei are more commonly used in day-to-day transactions and fee calculations, Wei is primarily used in technical discussions and low-level operations within smart contracts or protocol implementations.</p>
    </div>
  </div>
</template>

<script setup>
import { ethers } from "ethers";

import { ref, watch, computed } from "vue";

let ether = ref("1");
let gwei = ref("1000000000");
let wei = ref("1000000000000000000");

function setEther(a) {
  ether.value = a.target.value;
  let value = parseInt(ether.value);
  value = ethers.utils.parseUnits(value.toString(), "ether");
  gwei.value = ethers.utils.formatUnits(value, "gwei").toString();
  wei.value = ethers.utils.formatUnits(value, "wei").toString();
}

function setWei(a) {
  wei.value = a.target.value;
  value = ethers.utils.parseUnits(value.toString(), "ether");
  gwei.value = ethers.utils.formatUnits(value, "gwei").toString();
  ether.value = ethers.utils.formatUnits(value, "ether").toString();
}

function setGwei(a) {
  gwei.value = a.target.value;
  value = ethers.utils.parseUnits(value.toString(), "ether");
  wei.value = ethers.utils.formatUnits(value, "wei").toString();
  ether.value = ethers.utils.formatUnits(value, "ether").toString();
}

</script>