<template>
  <div class="relative border-b border-gray-200 bg-gray-50 pb-5 sm:pb-0 pt-2">
    <div class="md:flex md:items-center md:justify-between">
      <h3 class="text-l font-medium leading-6 text-black ml-4">
        <span
          v-if="contract.implementationContract != null"
          class="
            inline-flex
            items-center
            rounded-full
            bg-gray-100
            px-3
            py-0.5
            text-sm
            font-medium
            text-gray-800
          "
          >Proxy</span
        >
        {{ contract.name }} - {{ contract.address }}
        <h3
          v-if="contract.implementationContract != null"
          class="text-l font-medium text-black"
        >
          <span
            class="
              inline-flex
              items-center
              rounded-full
              bg-yellow-100
              px-3
              py-0.5
              text-sm
              font-medium
              text-yellow-800
            "
            >Implementation</span
          >
          {{ contract.implementationContract.name }} -
          {{ contract.implementationContract.address }}
        </h3>
      </h3>

      <div class="mt-3 flex md:absolute md:top-3 md:right-0 md:mt-0">
        <button
          v-if="!favorites.isFavoriteContract(contract.address)"
          @click="
            favorites.addFavoriteContract(contract.address, contract.name)
          "
          type="button"
          class="
            inline-flex
            items-center
            rounded-md
            border border-gray-300
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-gray-700
            shadow-sm
            hover:bg-gray-50
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:ring-offset-2
          "
        >
          Add to favorites
        </button>
        <button
          v-else
          type="button"
          @click="
            favorites.removeFavoriteContract(contract.address, contract.name)
          "
          class="
            inline-flex
            items-center
            rounded-md
            border border-gray-300
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-gray-700
            shadow-sm
            hover:bg-gray-50
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:ring-offset-2
          "
        >
          Remove from favorites
        </button>
      </div>
    </div>
    <div class="mt-4">
      <div class="">
        <nav class="-mb-px flex space-x-8 ml-5">
          <router-link
            v-for="tab in tabs"
            :key="tab.name"
            :to="tab.href"
            :class="[
              activeTab == tab.id
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-orange-500 hover:border-orange-500',
              'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
            ]"
            :aria-current="tab.current ? 'page' : undefined"
            >{{ tab.name }}</router-link
          >
        </nav>
      </div>
    </div>
    <div v-if="contract.contractInformations == null || contract.contractInformations == 'Guessed'" class="relative bg-indigo-600">
      <div class="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div class="pr-16 sm:px-16 sm:text-center">
          <p class="font-medium text-white">
            <span class="hidden md:inline"
              >No ABI found for this contract.</span
            >
          <!--  <span class="block sm:ml-2 sm:inline-block">
              <a href="#" class="font-bold text-white underline">
                Add a custom ABI
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </span> -->
          </p>
        </div>
        <div
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-start
            pt-1
            pr-1
            sm:items-start sm:pt-1 sm:pr-2
          "
        >
          <button
            type="button"
            class="
              flex
              rounded-md
              p-2
              hover:bg-indigo-500
              focus:outline-none focus:ring-2 focus:ring-white
            "
          >
            <span class="sr-only">Dismiss</span>
            <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFavoritesStore } from "@/stores/favorites";
let favorites = useFavoritesStore();

const props = defineProps(["contract", "activeTab"]);

let tabs = [
  {
    id: "functions",
    name: "Functions",
    href: "/address/" + props.contract.address,
  },
  {
    id: "source_code",
    name: "Source Code",
    href: "/address/" + props.contract.address + "/sourcecode",
  },
  {
    id: "infos",
    name: "Infos",
    href: "/address/" + props.contract.address + "/infos",
  },
  {
    id: "events",
    name: "Events",
    href: "/address/" + props.contract.address + "/events",
  },
];

console.log;
</script>