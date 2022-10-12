<template>
  <div class="address flex flex-col h-full">
    <AddressHeader activeTab="source_code" :contract="contract" />
    <div class="grid grid-cols-12 h-full overflow-hidden">
      <div class="col-span-4 h-full overflow-y-hidden">
        <AddressSources :contract="contract" @selected="onSourceSelected" />
      </div>
      <div class="col-span-8 h-full flex flex-col h-full">
        <div>
          <div
            :class="[
              'text-gray-600  flex items-center px-3 py-2 text-sm font-medium rounded-md',
            ]"
          >
            <span class="truncate"> {{ currentSource }}</span>
            <span
              @click="downloadSources"
              :class="[
                'bg-gray-200 text-gray-600',
                'ml-auto inline-block py-0.5 px-3 text-xs rounded-full',
              ]"
              >Download sources</span
            >
          </div>
        </div>
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

function downloadSources() {
  contracts.downloadSources(address);
}
</script>
<style>
</style>
