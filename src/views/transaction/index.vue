<template>
  <div class="block h-full overflow-scroll py-4 px-4 sm:px-6 lg:px-8">
    <div
      class="
        lg:flex lg:items-center lg:justify-between
        pb-6
        border-b border-gray-200
      "
    >
      <div class="min-w-0 flex-1">
        <h2
          class="
            text-2xl
            font-bold
            leading-7
            text-gray-900
            sm:truncate sm:text-3xl sm:tracking-tight
          "
        >
          Transaction #{{ tx.transactionHash }}
        </h2>
        <div
          class="
            mt-1
            flex flex-col
            sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6
          "
        >
         <div class="mt-2 flex items-center text-sm text-gray-500">
           <router-link :to="{ name: 'block', params: { blocknumber: block.number }}">Block #{{block.number}}</router-link>
          </div>
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <ClockIcon
              class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <timeago
              class="ml-1"
              :autoUpdate="30"
              :datetime="block.timestamp * 1000"
            />
          </div>
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon
              class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {{ new Date(block.timestamp * 1000).toLocaleString() }}
          </div>
        </div>
      </div>
      <!--
    <div class="mt-5 flex lg:mt-0 lg:ml-4">
      <span class="hidden sm:block">
        <button type="button" class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <PencilIcon class="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
          Edit
        </button>
      </span>

      <span class="ml-3 hidden sm:block">
        <button type="button" class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <LinkIcon class="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
          View
        </button>
      </span>

      <span class="sm:ml-3">
        <button type="button" class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <CheckIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Publish
        </button>
      </span>

      
      <Menu as="div" class="relative ml-3 sm:hidden">
        <MenuButton class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          More
          <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
        </MenuButton>

        <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <MenuItem v-slot="{ active }">
              <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Edit</a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">View</a>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
    --></div>
    <h1 class="text-2xl">Events:</h1>
    <json-viewer
      :value="tx.logs"
      :expand-depth="3"
      copyable
      boxed
    ></json-viewer>
  </div>
</template>

<script setup>
import {
  BriefcaseIcon,
  ClockIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from "@heroicons/vue/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

import { useRoute } from "vue-router";
import { ref, unref, onMounted } from "vue";
import { useWeb3Store } from "@/stores/web3";

const route = useRoute();
const hash = route.params.hash;

const web3 = useWeb3Store();
const ethers = await web3.getEthersAndConnect();
const tx = await ethers.getTransactionReceipt(hash);
const block = await ethers.getBlockWithTransactions(tx.blockHash);

</script>

<style>
</style>
