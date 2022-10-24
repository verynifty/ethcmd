<template>
  <div class="overflow-hidden bg-white">
    <div v-if="event != null">
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
                      @{{ ev.blockNumber }}
                      <timeago
                        class="ml-1"
                        :autoUpdate="30"
                        :datetime="ev.timestamp * 1000"
                      />
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
<center v-if="events.length > perPage">
      <vue-awesome-paginate
      class="mt-5 "
        :total-items="events.length"
        :items-per-page="perPage"
        :max-pages-shown="5"
        :current-page="currentPage"
        :on-click="pageClick"
      />
</center>
    </div>
  </div>
</template>

<script setup>
import ValueDisplay from "@/components/common/valuedisplay.vue";

import { watch, ref } from "vue";
import { useContractStore } from "@/stores/contracts";
import { useWeb3Store } from "@/stores/web3";

let contracts = useContractStore();
const web3 = useWeb3Store();
const currentPage = ref(1);
const perPage = ref(50);

const props = defineProps(["event", "address"]);

let contractEvents = await contracts.getContractEvents(props.address);
let events = ref([]);

async function getEvents() {
  events.value = await contracts.getEventsDecoded(
    props.address,
    props.event.signature
  );
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