<template>
  <div class="address">
    <AddressHeader :contract="contract" />
    <div class="grid grid-cols-12">
      <div class="col-span-4">
        <AddressFunctions :contract="contract" @selected="onFuncSelected" />
      </div>
      <div class="col-span-8">
        <AddressFunctionCall :func="currentFunction" :address="address" />
        <History :address="address" />
      </div>
    </div>
  </div>
</template>
<script setup>

console.log("ADDRESS INIT ")
import AddressHeader from "@/components/address/header.vue";
import AddressFunctions from "@/components/address/functions.vue";
import AddressFunctionCall from "@/components/address/functioncall.vue";
import History from "@/components/address/history.vue";

import { useRoute } from "vue-router";
import { ref, unref, onMounted } from "vue";

const route = useRoute();
const address = route.params.address.toLowerCase();
let contract = ref({ name: "" });

let currentFunction = ref(null);

import { useContractStore } from "@/stores/contracts";
let contracts = useContractStore();
console.log(contracts);
await contracts.getContract(address);
console.log("OK", contracts.$state.contracts);
contract.value = contracts.$state.contracts[address];
console.log(contract);
function onFuncSelected(func) {
  currentFunction.value = unref(func);
}
</script>
<style>
</style>
