<template>
  <div>
    <div class="">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">Transactions <span v-if="transactions.length > 0">({{transactions.length}})</span></h1>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            @click="exportToCSV"
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              rounded-md
              border border-transparent
              bg-indigo-600
              px-4
              py-2
              text-sm
              font-medium
              text-white
              shadow-sm
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:ring-offset-2
              sm:w-auto
            "
          >
            Export as CSV
          </button>
        </div>
      </div>
      <div class="mt-8 flex flex-col">
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
                        px-3
                        py-3.5
                        text-left text-sm
                        font-semibold
                        text-gray-900
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
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr
                    v-for="(tx, txId) in transactions"
                    :key="tx.hash"
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
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      <AddressDisplay :value="tx.from" />
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      <AddressDisplay :value="tx.to" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ExportToCsv } from "export-to-csv";
import { watch, ref, toRaw, unref } from "vue";

import AddressDisplay from "@/components/common/addressdisplay.vue";
import TransactionHashDisplay from "@/components/common/transactionhashdisplay.vue";

const props = defineProps(["transactions"]);

function exportToCSV() {
  const options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: false,
    filename: "transaction_list",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };

  const csvExporter = new ExportToCsv(options);
  csvExporter.generateCsv(
    toRaw(props.transactions).map(function (r) {
      return {
        blockNumber: r.blockNumber,
        hash: r.hash,
        transactionIndex: r.transactionIndex,
        confirmations: r.confirmations,
        from: r.from,
        to: r.to,
        gasPrice: r.gasPrice,
        gasLimit: r.gasLimit,
        value: r.value,
        nonce: r.nonce,
        data: r.data,
        chainId: r.chainId,
        creates: r.creates,
      };
    })
  );
}
</script>