<template>
  <div class="address flex flex-col h-full">
    <AddressHeader activeTab="functions" :contract="contract" />
    <div class="grid grid-cols-12 h-full overflow-hidden">
      <div class="col-span-3 h-full overflow-hidden">
        <AddressFunctions :contract="contract" @selected="onFuncSelected" />
      </div>
      <div class="col-span-9 h-full overflow-scroll bg-white p-1">
        <div class="bg-white p-2 shadow sm:rounded-lg m-2">
          <AddressFunctionCall :func="currentFunction" :address="address" />
        </div>

        <div class="bg-white p-2 shadow sm:rounded-lg m-2">
          <History :address="address" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import AddressHeader from "@/components/address/header.vue";
import AddressFunctions from "@/components/address/functions.vue";
import AddressFunctionCall from "@/components/address/functioncall.vue";
import History from "@/components/address/history.vue";

import { useRoute } from "vue-router";
import { ref, unref, onMounted } from "vue";

const route = useRoute();
const address = route.params.address.toLowerCase();
document.title = "Functions for " + address + " - ETHCMD";

let contract = ref({ name: "" });

let currentFunction = ref(null);

import { useContractStore } from "@/stores/contracts";
let contracts = useContractStore();
console.log(contracts);
await contracts.getContract(address);
contract.value = contracts.$state.contracts[address];
function onFuncSelected(func) {
  currentFunction.value = unref(func);
}
</script>
<style>
</style>
