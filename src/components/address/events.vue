<template>
  <aside class="w-full flex-col h-full overflow-hidden" aria-label="Sidebar">
    <div
      class="
        overflow-y-hidden
        h-full
        py-1
        px-2
        bg-gray-800
        flex flex-col
        h-full
      "
    >
      <div class="relative mb-2">
        <div
          class="
            flex
            absolute
            inset-y-0
            left-0
            items-center
            pl-3
            pointer-events-none
          "
        >
          <svg
            class="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="{1.5}"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="input-group-1"
          class="
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            pl-10
            p-2.5
            bg-gray-700
            border-gray-600
            placeholder-gray-400
            text-white
            focus:ring-blue-500 focus:border-blue-500
          "
          placeholder="filter"
          v-model="filter"
        />
      </div>

      <ul class="h-full overflow-scroll">
        <li v-for="event in getEvents">
          <div
            @click="onEventClick(func)"
            :class="[
              'flex items-center p-1 text-s font-light text-white rounded-lg  cursor-pointer	 hover:bg-gray-700',
              event.proxyImplementation == true ? 'text-yellow-100	' : ' ',
            ]"
          >
            <span class="mr-1">
              {{ event.id }}
            </span>
            

            <span class="ml-1"> {{ event.name }}</span>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useContractStore } from "@/stores/contracts";
let contracts = useContractStore();

const router = useRouter();
const route = useRoute();

const emit = defineEmits(["selected"]);

const props = defineProps(["contract"]);
let events = contracts.contractEvents(props.contract.address);
console.log(events)
const filter = ref("");

let getEventsRaw = function () {
  if (filter.value == null || filter.value == "") {
    return events;
  }
  return events.filter(function (event) {
    return event.name.toLowerCase().includes(filter.value.toLowerCase());
  });
};
let getEvents = computed(getEventsRaw);

let selected = ref({});
async function onEventClick(event) {
  console.log(event);
  router.push({
    path: router.currentRoute.value.path,
    query: { log0: event.signature },
  });
  console.log("ONCLICK");
  selected.value = event;
  emit("selected", event);
}

function getEventById(id) {
  let fs = getEventsRaw();
  for (const f of fs) {
    if (f.signature == id) {
      return f;
    }
  }
  return {
    signature: "any",
  };
}

let queryFunc = route.query.function;
console.log(queryFunc);
if (queryFunc != null) {
  queryFunc = parseInt(queryFunc);
} else {
  queryFunc = 1;
}

onEventClick(getEventById(queryFunc));
</script>