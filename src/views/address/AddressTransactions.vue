<template>
  <div class="address flex flex-col h-full">
    <AddressHeader activeTab="transactions" :contract="contract" />
    <div class="h-full overflow-scroll">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <p class="mt-2 text-sm text-gray-700">
            A list of transactions for contract {{ address }}
          </p>
        </div>
      </div>
      <div v-if="!isLoading" class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
          >
            <div
              class="
                overflow-hidden
                shadow
                ring-1 ring-black ring-opacity-5
                md:rounded-lg
              "
            >
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="
                        py-3.5
                        pl-4
                        pr-3
                        text-left text-sm
                        font-semibold
                        text-gray-900
                        sm:pl-6
                      "
                    >
                      Hash
                    </th>
                    <th
                      scope="col"
                      class="
                        py-3.5
                        pl-4
                        pr-3
                        text-left text-sm
                        font-semibold
                        text-gray-900
                        sm:pl-6
                      "
                    >
                      From
                    </th>
                    <th
                      scope="col"
                      class="
                        px-3
                        py-3.5
                        text-left text-sm
                        font-semibold
                        text-gray-900
                      "
                    >
                      To
                    </th>
                       <th
                      scope="col"
                      class="
                        px-3
                        py-3.5
                        text-left text-sm
                        font-semibold
                        text-gray-900
                      "
                    >
                      Function
                    </th>
                    <th
                      scope="col"
                      class="
                        px-3
                        py-3.5
                        text-left text-sm
                        font-semibold
                        text-gray-900
                      "
                    >
                      Calls
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr
                    v-for="(tx, txId) in getPaginateTXs()"
                    :class="txId % 2 === 0 ? undefined : 'bg-gray-50'"
                  >
                    <td
                      class="
                        whitespace-nowrap
                        py-4
                        pl-4
                        pr-3
                        text-sm
                        font-medium
                        text-gray-900
                        sm:pl-6
                      "
                    >
                      <TransactionHashDisplay :value="tx.hash" />
                    </td>
                    <td
                      class="
                        whitespace-nowrap
                        py-4
                        pl-4
                        pr-3
                        text-sm
                        font-medium
                        text-gray-900
                        sm:pl-6
                      "
                    >
                      <AddressDisplay :value="tx.from" />
                    </td>
                     <td
                      class="
                        whitespace-nowrap
                        py-4
                        pl-4
                        pr-3
                        text-sm
                        font-medium
                        text-gray-900
                        sm:pl-6
                      "
                    >
                      <AddressDisplay :value="tx.to" />
                    </td>
                      <td
                      class="
                        whitespace-nowrap
                        py-4
                        pl-4
                        pr-3
                        text-sm
                        font-medium
                        text-gray-900
                        sm:pl-6
                      "
                    >
                    <FuncSelectorDisplay :value="tx.funcSelector" />
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      <timeBlockDisplay
                        :blockNumber="tx.blockNumber"
                        :timestamp="tx.timeStamp"
                      />
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    ></td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    ></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div v-if="txs.length > perPage">
          <vue-awesome-paginate
            class="mt-5"
            :total-items="txs.length"
            :items-per-page="perPage"
            :max-pages-shown="5"
            :current-page="currentPage"
            :on-click="pageClick"
          />
        </div>
      </div>
      <div v-else>
        <Loader message="Loading transactions" class="pt-20 pb-20" />
      </div>
    </div>
  </div>
</template>

<script setup>
let isLoading = ref(true);
let txs = ref([]);

import axios from "axios";

import AddressDisplay from "@/components/common/addressdisplay.vue";
import AddressHeader from "@/components/address/header.vue";
import Loader from "@/components/template/Loader.vue";
import timeBlockDisplay from "@/components/common/timeBlockDisplay.vue";
import FuncSelectorDisplay from "@/components/common/functionselectordisplay.vue";
import TransactionHashDisplay from "@/components/common/transactionhashdisplay.vue";

import { useRoute } from "vue-router";
import { ref, unref, onMounted } from "vue";

const route = useRoute();
const address = route.params.address.toLowerCase();
document.title = "Transactions for " + address + " - ETHCMD";

let contract = ref({ name: "" });
const currentPage = ref(1);
const perPage = ref(50);

function pageClick(page) {
  console.log("PageClick", page);
  currentPage.value = page;
}

import { useContractStore } from "@/stores/contracts";
let contracts = useContractStore();
console.log(contracts);
await contracts.getContract(address);
contract.value = contracts.$state.contracts[address];
let etherscan = process.env.ETHERSCAN_API_KEY;

axios
  .get(
    process.env.ETHERSCAN_API +
      `/api?module=account&action=txlist&address=${address}&apikey=${etherscan}&sort=desc`
  )
  .then(function (res) {
    console.log("RES, ", res);
    for (let i = 0; i < res.data.result.length; i++) {
      console.log(res.data.result[i])
      res.data.result[i].funcSelector = res.data.result[i].input.substring(0, 10).toLowerCase();
    }
    txs.value = res.data.result;
    isLoading.value = false;
  });

function getPaginateTXs() {
  return txs.value.slice(
    (currentPage.value - 1) * perPage.value,
    currentPage.value * perPage.value
  );
}
</script>
<style>
</style>
