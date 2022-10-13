<template>
  <div v-if="func != null" class="overflow-hidden bg-white">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        <span
          class="
            bg-gray-100
            text-gray-800 text-xs
            font-medium
            inline-flex
            items-center
            px-2.5
            py-0.5
            rounded
            mr-2
            dark:bg-gray-700 dark:text-gray-300
          "
        >
          {{ func.id }}
        </span>
        {{ func.name }}
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500"></p>
    </div>
    <div class="">
      <dl>
        <div
          v-for="(input, index) in func.inputs"
          class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-sm font-medium text-gray-500">{{ input.name }}</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <input
              v-model="inputs[index].value"
              class="
                shadow
                appearance-none
                border
                rounded
                w-full
                py-2
                px-3
                text-gray-700
                leading-tight
                focus:outline-none focus:shadow-outline
              "
              type="text"
              placeholder=""
            />
          </dd>
        </div>
        <div v-if="!showMore" @click="showMore = !showMore" class="relative">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300" />
          </div>
          <div class="relative flex justify-center">
            <button
              type="button"
              class="
                inline-flex
                items-center
                rounded-full
                border border-gray-300
                bg-white
                px-4
                py-1.5
                text-sm
                font-medium
                leading-5
                text-gray-700
                shadow-sm
                hover:bg-gray-50
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
                focus:ring-offset-2
              "
            >
              <svg
                class="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span>Custom options</span>
            </button>
          </div>
        </div>
        <div v-else>
          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300" />
            </div>
          </div>
           <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Value (Wei)</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <input
                v-model="weiValue"
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-full
                  py-2
                  px-3
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                "
                type="text"
                placeholder=""
              />
            </dd>
          </div>
          <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"  v-if="func.stateMutability == 'view'">
            <dt class="text-sm font-medium text-gray-500">Block Number</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <input
                v-model="blockNumber"
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-full
                  py-2
                  px-3
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                "
                type="text"
                placeholder=""
              />
            </dd>
          </div>
           <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" v-if="func.stateMutability == 'view'">
            <dt class="text-sm font-medium text-gray-500">From address</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <input
                v-model="fromAddress"
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-full
                  py-2
                  px-3
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                "
                type="text"
                placeholder=""
              />
            </dd>
          </div>
          <div class="relative" @click="showMore = !showMore">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center">
              <button
                type="button"
                class="
                  inline-flex
                  items-center
                  rounded-full
                  border border-gray-300
                  bg-white
                  px-4
                  py-1.5
                  text-sm
                  font-medium
                  leading-5
                  text-gray-700
                  shadow-sm
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                  focus:ring-offset-2
                "
              >
                <svg
                  class="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
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
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span>Hide options</span>
              </button>
            </div>
          </div>
        </div>
        <div class="sm:col-span-2 sm:flex sm:justify-end">
          <div v-if="func.stateMutability != 'view'">
            <!--<button
              class="
                bg-transparent
                hover:bg-blue-500
                text-blue-700
                font-semibold
                hover:text-white
                py-2
                px-4
                border border-blue-500
                hover:border-transparent
                rounded
              "
            >
              Simulate
            </button> -->
            <button
              @click="send"
              class="
                bg-transparent
                hover:bg-blue-500
                text-blue-700
                font-semibold
                hover:text-white
                py-2
                px-4
                border border-blue-500
                hover:border-transparent
                rounded
              "
            >
              Send tx
            </button>
          </div>
          <div v-else>
            <button
              @click="call"
              class="
                bg-transparent
                hover:bg-blue-500
                text-blue-700
                font-semibold
                hover:text-white
                py-2
                px-4
                border border-blue-500
                hover:border-transparent
                rounded
              "
            >
              Read
            </button>
          </div>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";

const props = defineProps(["func", "address"]);
import { useContractStore } from "@/stores/contracts";
let contracts = useContractStore();
import { useWeb3Store } from "@/stores/web3";
const web3 = useWeb3Store();
let inputs = ref([]);

let fromAddress = web3.account
let blockNumber = ref("latest");
let weiValue = ref("0");

let showMore = ref(false);

async function call() {
  console.log("CALL");
  await contracts.callContract(props.address, props.func, inputs.value, fromAddress, blockNumber.value, weiValue.value);
}

async function send() {
  console.log("SEND");
  await contracts.sendContract(props.address, props.func, inputs.value, weiValue.value);
}

watch(
  () => props.func,
  async function () {
    inputs.value = [];
    for (const input of props.func.inputs) {
      console.log(input);
      inputs.value.push({ value: "" });
    }
    if (inputs.value.length == 0 && props.func.stateMutability == "view") {
      console.log("CALL");
      await call();
    }
  }
);

console.log(props.func);
</script>