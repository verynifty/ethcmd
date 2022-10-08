<template>
<div class="w-full h-full overflow-hidden bg-gray-800 p-5">
  <div class="w-full overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        <span v-if="contract.implementationContract != null">Proxy</span> Contract {{ contract.name }} 
      </h3>
      <p class="mt-1  text-sm text-gray-500">
        {{ contract.name }} is a contract deployed at {{ contract.address }}. 
      </p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Compiler version</dt>
          <dd class="mt-1 text-sm text-gray-900">{{contract.compilerVersion}}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Optimization runs</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ contract.optimizationUsed == "1" ? contract.runs : "No"}}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Language</dt>
          <dd class="mt-1 text-sm text-gray-900">{{contract.sourceCode.language}}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Proxy</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ contract.proxy == "0" ? "No" : "Yes (" +contract.proxy + ")"}}</dd>
        </div>
        <div class="sm:col-span-2">
          <dt class="text-sm font-medium text-gray-500">Constructor Arguments</dt>
          <dd class="mt-1 text-sm text-gray-900">
            0x{{contract.constructorArguments}}
          </dd>
        </div>
        <div class="sm:col-span-2">
          <dt class="text-sm font-medium text-gray-500">Events</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <ul
              role="list"
              class="divide-y divide-gray-200 rounded-md border border-gray-200"
            >
              <li  v-for="ev in contracts.contractEvents(contract.address)"
                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
              >
                <div class="flex w-0 flex-1 items-center">
                  <span class="ml-2 w-0 flex-1 truncate"
                    >{{ev.name}}</span
                  >
                </div>
                <div class="ml-4 flex-shrink-0">
                  <a
                    href="#"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                    >Download</a
                  >
                </div>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </div>
  </div>
</template>

<script setup>
import { PaperClipIcon } from "@heroicons/vue/20/solid";

const props = defineProps(["contract"]);

import { useContractStore } from "@/stores/contracts";
let contracts = useContractStore();

</script>