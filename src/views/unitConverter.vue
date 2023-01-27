

<template>
  <div class="h-full bg-gray-100 overflow-scroll p-10">
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
      <p class="mt-2 text-sm text-gray-500" id="ether-description">
        We'll only use this for spam.
      </p>
    </div>
    <div>
      <label for="gwei" class="block text-sm font-medium text-gray-700"
        >Gwei</label
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
      <p class="mt-2 text-sm text-gray-500" id="gwei-description">
        We'll only use this for spam.
      </p>
    </div>
    <div>
      <label for="wei" class="block text-sm font-medium text-gray-700"
        >Wei</label
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
      <p class="mt-2 text-sm text-gray-500" id="wei-description">
        We'll only use this for spam.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ethers } from "ethers";

import { ref, watch, computed } from "vue";

let ether = ref("1");
let gwei = ref("0");
let wei = ref("0");

function setEther(a) {
  ether.value = a.target.value;
  let value = parseInt(ether.value);
  gwei.value = (value * 1e9).toLocaleString("fullwide", { useGrouping: false });
  wei.value = (value * 1e18).toLocaleString("fullwide", { useGrouping: false });
}

function setWei(a) {
  wei.value = a.target.value;
  let value = parseInt(wei.value);
  gwei.value = (value / 1e9).toLocaleString("fullwide", { useGrouping: false });
  ether.value = (value / 1e18).toLocaleString("fullwide", {
    useGrouping: false,
  });
}

function setGwei(a) {
  gwei.value = a.target.value;
  let value = parseInt(gwei.value);
  wei.value = (value * 1e9).toLocaleString("fullwide", { useGrouping: false });
  ether.value = (value / 1e9).toLocaleString("fullwide", { useGrouping: false });
}
</script>