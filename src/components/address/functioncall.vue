<template>
  <div class="overflow-hidden bg-white">
    <div v-if="func != null">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          <span
            class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300"
          >
            {{ func.id }}
          </span>
          {{ currentDef }}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500"></p>
      </div>
      <div v-if="func.stateMutability != null" class="">
        <dl>
          <div
            v-for="(input, index) in func.inputs"
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">
              {{ input.types }}
              <span
                class="text-xs font-semibold inline-block py-1 px-2 rounded text-slate-600 bg-slate-200 last:mr-0 mr-1"
              >
                {{ input.type }}</span
              >
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <input
                v-model="inputs[index].value"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder=""
              />
            </dd>
          </div>
          <div
            v-if="func.stateMutability != null && !showMore"
            @click="showMore = !showMore"
            class="relative"
          >
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center">
              <button
                type="button"
                class="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
          <div v-else-if="func.stateMutability != null">
            <div class="relative">
              <div
                class="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div class="w-full border-t border-gray-300" />
              </div>
            </div>
            <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Value (Wei)</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <input
                  v-model="weiValue"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder=""
                />
              </dd>
            </div>
            <div
              class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              v-if="func.stateMutability == 'view'"
            >
              <dt class="text-sm font-medium text-gray-500">Block Number</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <input
                  v-model="blockNumber"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder=""
                />
              </dd>
            </div>
            <div
              class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              v-if="func.stateMutability == 'view'"
            >
              <dt class="text-sm font-medium text-gray-500">From address</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <input
                  v-model="fromAddress"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder=""
                />
              </dd>
            </div>
            <div class="relative" @click="showMore = !showMore">
              <div
                class="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center">
                <button
                  type="button"
                  class="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
            <div
              v-if="
                func.stateMutability != null && func.stateMutability != 'view'
              "
            >
              <button
                @click="send"
                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Send tx
              </button>
            </div>
            <div
              v-if="
                func.stateMutability != null && func.stateMutability == 'view'
              "
            >
              <button
                @click="call"
                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Read
              </button>
            </div>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import { useContractStore } from "@/stores/contracts";
import { useWeb3Store } from "@/stores/web3";
import { ethers } from "ethers";

const route = useRoute();

const paramsData = route.query.calldata;

let contracts = useContractStore();
const web3 = useWeb3Store();

const props = defineProps(["func", "address"]);

let inputs = ref([]);
let fromAddress = ref(web3.account);
let blockNumber = ref("latest");
let weiValue = ref("0");
let showMore = ref(false);
let currentDef = ref("");
let contract = await contracts.getContract(props.address);

async function call() {
  if (web3.account == null) {
    web3.setWeb3();
    return;
  }
  await contracts.callContract(
    props.address,
    props.func,
    inputs.value,
    fromAddress.value,
    blockNumber.value,
    weiValue.value
  );
}

async function send() {
  if (web3.account == null) {
    web3.setWeb3();
    return;
  }
  await contracts.sendContract(
    props.address,
    props.func,
    inputs.value,
    weiValue.value
  );
}

async function setInputs() {
  console.log("FUNC WATCH", props.func);

  let inputTypes = []

  inputs.value = [];
  for (const input of props.func.inputs) {
    console.log(input);
    inputs.value.push({ value: "" });
    inputTypes.push(input.type);
  }
  if (paramsData != null) {
    let params = ethers.utils.defaultAbiCoder.decode(inputTypes, paramsData);
    console.log(params);
    for (let i = 0; i < params.length; i++) {
      inputs.value[i].value = params[i];
    }
  }
  console.log(inputTypes);
  let def = await contracts.ABItoHuman(props.func);
  console.log(def);
  if (def.startsWith("function ")) {
    def = def.replace("function ", "");
  }
  currentDef.value = def;

  if (inputs.value.length == 0 && props.func.stateMutability == "view") {
    console.log("CALL");
    await call();
  }
}
watch(
  () => props.func,
  async function () {
    setInputs();
  }
);
setInputs();
</script>