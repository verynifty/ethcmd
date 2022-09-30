<template>
  <div class="address">
    <AddressHeader :contract="contract" />
    <div class="grid grid-cols-12">
      <div class="col-span-4">
        <AddressSources :contract="contract" @selected="onSourceSelected" />
      </div>
      <div class="col-span-8">
        <AddressSourceView :contract="contract" :sourceFile="currentSource" />
      </div>
    </div>
  </div>
</template>
<script setup>
import AddressHeader from "@/components/address/header.vue";
import AddressSources from "@/components/address/sources.vue";
import AddressSourceView from "@/components/address/sourceview.vue";

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

function onSourceSelected(func) {
  currentSource.value = unref(func);
}

</script>
<style>
</style>
