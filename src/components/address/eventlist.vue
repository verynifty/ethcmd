<template>
  <div class="overflow-hidden bg-white">
      <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
    <div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
      <div class="ml-4 mt-2">
        <h3 class="text-m font-medium leading-3 text-gray-900">{{event.name != null ? event.name : "All events"}} <span v-if="!isLoading">({{events.length}})</span></h3>
      </div>
      <div class="ml-4 mt-2 flex-shrink-0">
        <button @click="exportToCSV" v-if="!isLoading && events.length > 0" type="button" class="relative inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-gray shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2">CSV export</button>
      </div>
    </div>
  </div>

    <div v-if="isLoading">
      <Loader message="Loading events.. It may take a while or crash your browser if the contract has a lot of usage." class="pt-20 pb-20" />
      </div>
    <div v-if="!isLoading && event != null">
      <div class="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" class="divide-y divide-gray-200">
          <li v-for="ev in getPaginateEvents()">
            <a href="#" class="block hover:bg-gray-50">
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <p class="truncate text-sm font-medium text-indigo-600">
                    {{ ev.name }}
                  </p>
                  <div class="ml-2 flex flex-shrink-0">
                    <p
                      class="
                        inline-flex
                        rounded-full
                        px-2
                        text-xs
                        font-semibold
                        leading-5
                      "
                    >

                    <p>
                    <timeBlockDisplay :blockNumber="ev.blockNumber" :timestamp="ev.timestamp" />
                    </p>
                    </p>
                  </div>
                </div>
                <div class="mt-2 w-full">
                  <div>
                    <div v-for="(a, index) in ev.args">
                      <ValueDisplay
                        :name="contractEvents[ev.topics[0]].inputs[index].name"
                        :type="contractEvents[ev.topics[0]].inputs[index].type"
                        :value="a"
                      />
                    </div>
                  </div>
                 
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
<div v-if="events.length > perPage">
      <vue-awesome-paginate
      class="mt-5 "
        :total-items="events.length"
        :items-per-page="perPage"
        :max-pages-shown="5"
        :current-page="currentPage"
        :on-click="pageClick"
      />
</div>
    </div>
  </div>
</template>

<script setup>
import ValueDisplay from "@/components/common/valuedisplay.vue";
import timeBlockDisplay from "@/components/common/timeBlockDisplay.vue";

import Loader from "@/components/template/Loader.vue";

import { watch, ref, toRaw } from "vue";
import { useContractStore } from "@/stores/contracts";
import { useWeb3Store } from "@/stores/web3";

import { ExportToCsv } from "export-to-csv";

let contracts = useContractStore();
const web3 = useWeb3Store();
const currentPage = ref(1);
const perPage = ref(50);
const isLoading = ref(true);

const props = defineProps(["event", "address"]);

let contractEvents = await contracts.getContractEvents(props.address);
let events = ref([]);

async function getEvents() {
  isLoading.value = true;
  events.value = await contracts.getEventsDecoded(props.address, [
    props.event.signature != "any" ? props.event.signature : null,
  ]);
  isLoading.value = false;
}

function pageClick(page) {
  console.log("PageClick", page);
  currentPage.value = page;
}

function getPaginateEvents() {
  let temp = events.value.sort(function (b, a) {
    return a.blockNumber - b.blockNumber;
  });
  return events.value.slice(
    (currentPage.value - 1) * perPage.value,
    currentPage.value * perPage.value
  );
}

function exportToCSV() {
  let tmp = [].concat(events.value);
  tmp = tmp.map(function (e) {
    e = toRaw(e);
    let argCounter = 0;
    for (const a of e.args) {
      e["argument_" + argCounter++] = a;
    }
    delete e.args;
    delete e.topics;
    delete e.removed;
    return e;
  });
  const options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: true,
    title: "My Awesome CSV",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };

  const csvExporter = new ExportToCsv(options);
  csvExporter.generateCsv(tmp);
}

watch(
  () => props.event,
  async function () {
    await getEvents();
  }
);

getEvents();
</script>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>