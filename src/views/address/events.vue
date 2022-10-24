<template>
  <div class="address flex flex-col h-full">
    <AddressHeader activeTab="events" :contract="contract" />
    <div class="grid grid-cols-12 h-full overflow-hidden">
      <div class="col-span-3 h-full overflow-hidden">
        <AddressEvents :contract="contract" @selected="onEventSelected" />
      </div>
      <div class="col-span-9 h-full overflow-scroll bg-white p-1">
        <AddressEventList :address="address" :event="currentEvent" />
      </div>
    </div>
  </div>
</template>
<script setup>
import AddressHeader from "@/components/address/header.vue";
import AddressEvents from "@/components/address/events.vue";
import AddressEventList from "@/components/address/eventlist.vue";

import { useRoute } from "vue-router";
import { ref, unref, onMounted } from "vue";

let currentEvent = ref(null);

const route = useRoute();
const address = route.params.address.toLowerCase();
let contract = ref({ name: "" });

import { useContractStore } from "@/stores/contracts";
let contracts = useContractStore();
console.log(contracts);
await contracts.getContract(address);
contract.value = contracts.$state.contracts[address];

function onEventSelected(event) {
    console.log("ON EVENT SLECTED", event)
  currentEvent.value = unref(event);
}
</script>
<style>
</style>
