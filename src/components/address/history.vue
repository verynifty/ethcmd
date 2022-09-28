<template>
  <div>
    History

    <div class="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-bind:key="hindex" v-for="(h, hindex) in history.contractHistory">
          <div class="block hover:bg-gray-50">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <p class="truncate text-sm font-medium text-indigo-600">
                  {{ h.func.name }}(<span class="text-sm text-gray-500" v-for="(p, index) in h.params">{{p}}<span v-if="h.params.length > index + 1">, </span> </span>)
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
                    {{ h.type }}
                  </p>
                </div>
              </div>
              <div class="mt-2 sm:flex sm:justify-between">
                <div class="sm:flex">
                  <p class="flex items-center text-sm text-gray-500">
                      <ul >
                    <li v-bind:key="index" v-for="(o, index) in h.func.outputs">
                        {{o.name}}
                      {{o.type}}
                      <span v-if="typeof (h.result) == 'object'">
                      {{ o.name != '' ? h.result[o.name] : h.result["" + (index + 1)]}}
                      </span>
                      <span v-else>
                          {{ h.result}}
                          </span>
                    </li>
                    </ul>
                    
                  </p>
                </div>
                <div
                  class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                >
                  <p>
                    @ {{ h.block.number }}
                    <timeago
                      :autoUpdate="30"
                      :datetime="h.block.timestamp * 1000"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useHistoryStore } from "@/stores/history";
let history = useHistoryStore();
console.log("HISTORY", history.contractHistory);

const props = defineProps(["address"]);
</script>