<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">
          Interesting functions
        </h1>
        <p class="mt-2 text-sm text-gray-700">
          A list of all the users in your account including their name, title,
          email and role.
        </p>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
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
                    Contract
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
                     # Callers
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr
                  v-for="(func, funcId) in getSelectors()"
                  :key="funcId"
                  :class="funcId % 2 === 0 ? undefined : 'bg-gray-50'"
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
                    <AddressDisplay :value="func[0].to" />
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ func[0].funcSelector }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ func.length }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ uniqueItems(func, 'from') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AddressDisplay from "@/components/common/addressdisplay.vue";

import { useWeb3Store } from "@/stores/web3";

const web3 = useWeb3Store();
const ethers = await web3.getEthersAndConnect();

let isLoading = true;
let toBlock = await ethers.getBlockNumber("latest");
let fromBlock = toBlock - 10;

let blocksPromises = [];
for (let index = fromBlock; index < toBlock; index++) {
  blocksPromises.push(ethers.getBlockWithTransactions(index));
}
console.log(blocksPromises);
const blocks = await Promise.all(blocksPromises);
console.log(blocks);

let targetContract = {};
let targetFunction = {};
let funcSelectors = {};

const uniqueItems = (list, keyFn) => list.reduce((resultSet, item) =>
    resultSet.add(typeof keyFn === 'string' ? item[keyFn] : keyFn(item)),
  new Set).size;

for (const b of blocks) {
  for (const t of b.transactions) {
    if (t.data == null) continue;
    let funcSelector = t.data.substring(0, 10).toLowerCase();
    if (funcSelector.length != 10) continue;
    let to =
      t.to != null
        ? t.to.toLowerCase()
        : "0x0000000000000000000000000000000000000000";
    let from = t.from.toLowerCase();
    let id = to + "_" + funcSelector;
    if (targetContract[to] == null) {
      targetContract[to] = [];
    }
    let call = {
      funcSelector: funcSelector,
      from: from,
      to: to,
      data: t.data,
      nonce: t.nonce,
      blockNumber: t.blockNumber,
    };
    targetContract[to].push();
    if (targetFunction[id] == null) {
      targetFunction[id] = [];
    }
    targetFunction[id].push(call);

    if (funcSelectors[funcSelector] == null) {
      funcSelectors[funcSelector] = true;
    }
    //funcSelectors[funcSelector].push(funcSelectors[funcSelector])
  }
  targetFunction = Object.values(targetFunction);
  console.log(targetFunction);
}

function getSelectors() {
  return targetFunction.sort(function (b, a) {
    return a.length - b.length;
  }).slice(0, 15);;
}
</script>