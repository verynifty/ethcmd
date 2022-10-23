<template>
  <div class="overflow-hidden bg-white">
    <div v-if="event != null">
      <div class="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" class="divide-y divide-gray-200">
          <li v-for="ev in events">
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
                        bg-green-100
                        px-2
                        text-xs
                        font-semibold
                        leading-5
                        text-green-800
                      "
                    >
                      {{ ev.signature }}
                    </p>
                  </div>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <div>
                    <div v-for="a in ev.args">
                      {{ a }}
                    </div>
                  </div>
                  <div
                    class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                  >
                    <p>
                      @{{ ev.blockNumber }}
                      <timeago
                        class="ml-1"
                        :autoUpdate="30"
                        :datetime="ev.timestamp * 1000"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CalendarIcon, MapPinIcon, UsersIcon } from "@heroicons/vue/20/solid";

import { watch, ref } from "vue";
import { useContractStore } from "@/stores/contracts";
import { useWeb3Store } from "@/stores/web3";

let contracts = useContractStore();
const web3 = useWeb3Store();

const props = defineProps(["event", "address"]);

let events = ref([]);

async function getEvents() {
  events.value = await contracts.getEventsDecoded(
    props.address,
    props.event.signature
  );
  console.log(events.value);
}

watch(
  () => props.event,
  async function () {
    await getEvents();
  }
);
</script>