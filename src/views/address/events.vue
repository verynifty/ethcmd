<template>
  <div class="address flex flex-col h-full">
    <AddressHeader activeTab="events" :contract="contract" />
    <div class=" overflow-y-scroll ">
      <ContractInfo :contract="contract" />
      <ContractInfo v-if="contract.implementationContract != null" :contract="contract.implementationContract" />
    </div>
  </div>
</template>
<script setup>

import AddressHeader from "@/components/address/header.vue";
import ContractInfo from "@/components/address/infos.vue";

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
