<template>
  <div>
    <div
      v-if="web3.account != null && web3.chainId != networkId"
      class="rounded-md bg-red-50 p-4"
    >
      <div class="flex">
        <div class="flex-shrink-0">
          <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div class="ml-5 w-full">
          <h3 class="text-sm font-medium text-red-800">Wrong network</h3>
          <div class="mt-2 text-center text-sm text-red-700">
            <p>
              Please connect to the {{ networkName }} with chain id:
              {{ networkId }}.
            </p>
            <p>
              <a
                target="_blank"
                :href="'https://chainlist.org/chain/' + networkId"
              >
                <button
                  class="
                    bg-white
                    mt-3
                    hover:bg-gray-100
                    text-gray-800
                    font-semibold
                    py-2
                    px-4
                    border border-gray-400
                    rounded
                    shadow
                  "
                >
                  Change Network
                </button>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XCircleIcon } from "@heroicons/vue/20/solid";
import { useWeb3Store } from "@/stores/web3";

const web3 = useWeb3Store();

import { onMounted, ref } from "vue";

const networkName = ref(process.env.CHAINNAME);
const networkId = ref(parseInt(process.env.CHAINID));

onMounted(() => {
  console.log("ONMOUNTED");
  networkName.value = process.env.CHAINNAME;
  networkId.value = parseInt(process.env.CHAINID);
  console.log(web3.chainId)
});
</script>