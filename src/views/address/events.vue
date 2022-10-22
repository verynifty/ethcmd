<template>
  <div class="address flex flex-col h-full">
    <AddressHeader activeTab="events" :contract="contract" />
    <div class="grid grid-cols-12 h-full overflow-hidden">
      <div class="col-span-3 h-full overflow-hidden">
        <AddressEvents :contract="contract" @selected="onFuncSelected" />
      </div>
      <div class="col-span-9 h-full overflow-scroll bg-white p-1">
       hello
      </div>
    </div>
  </div>
</template>
<script setup>

import AddressHeader from "@/components/address/header.vue";
import AddressEvents from "@/components/address/events.vue";

import { useRoute } from "vue-router";
import { ref, unref, onMounted } from "vue";

let currentSource = ref(null);

const route = useRoute();
const address = route.params.address.toLowerCase();
let contract = ref({ name: "" });

let currentFunction = ref(null);

import { useContractStore } from "@/stores/contracts";
let contracts = useContractStore();
console.log(contracts);
await contracts.getContract(address);
contract.value = contracts.$state.contracts[address];


</script>
<style>
</style>
