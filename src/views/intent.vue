

<template>
  <div class="h-full bg-gray-100 overflow-scroll p-10">
    <p class="font-semibold leading-1 text-gray-900 mb-5 text-2xl">
      Transaction int3nt
    </p>
    <p class="mb-5">
      Int3nt is an easy way to share transactions to be executed by someone
      else. Execute a transaction shared by someone else in one click.
    </p>
    <p class="mb-5 text-orange-500">
      ⚠️ You should only execute transactions that were shared to you by someone
      or a dapp you trust ⚠️
    </p>
    <label for="to" class="block text-sm font-medium leading-6 text-gray-900"
      >To</label
    >
    <div class="mt-2">
      <input
        v-model="to"
        type="text"
        name="to"
        id="to"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>

    <label
      for="value"
      class="mt-4 block text-sm font-medium leading-6 text-gray-900"
      >Value (wei)</label
    >
    <div class="mt-2">
      <input
        v-model="value"
        type="text"
        name="value"
        id="value"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
    <label
      for="message"
      class="mt-4 block mb-2 text-sm font-medium text-gray-900"
      >Raw data</label
    >
    <textarea
      v-model="calldata"
      rows="4"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    ></textarea>
    <p v-if="funcSelector != null && funcSelector != '0x' && funcSelector != ''">
    Guessed function selector:
    <span class="font-bold">
    <FuncSelectorDisplay  :value="funcSelector" />
    </span>
    </p>

    <button
      @click="onSend()"
      class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Send transaction
    </button>

    <p class="mt-20 font-semibold leading-1 text-gray-900 mb-5 text-2xl">
      How to create an int3nt
    </p>
    <p class="mb-1">
      Simply edit and share the URL with the following query parameters (to,
      data, value):
    </p>
    <p class="mb-1">
      <a
        class="font-medium text-blue-600 underline"
        href="https://ethcmd.com/int3nt?to=0x0000000000000000000000000000000000000000&value=0&data=0x"
        >https://ethcmd.com/int3nt?to=0x0000000000000000000000000000000000000000&value=0&data=0x</a
      >
    </p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch, computed } from "vue";
import { useWeb3Store } from "@/stores/web3";
import FuncSelectorDisplay from "@/components/common/functionselectordisplay.vue";

const web3 = useWeb3Store();

let to = ref("0x0000000000000000000000000000000000000000");

let calldata = ref("0x");

let value = ref("0x0");

const route = useRoute();
if (route.query.to != null) {
  to.value = route.query.to;
}
if (route.query.data != null) {
  calldata.value = route.query.data;
}
if (route.query.value != null) {
  value.value = route.query.value;
}

let getFunctionsSelector = function () {
  return calldata.value.substring(0, 10).toLowerCase();
};
let funcSelector = computed(getFunctionsSelector);

async function onSend() {
  let tx = await web3.sendIntent(to.value, value.value, calldata.value);
  console.log(tx);
}
</script>