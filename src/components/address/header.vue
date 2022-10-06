<template>
  <div class="relative border-b border-gray-200  bg-gray-50 pb-5 sm:pb-0 pt-2">
    <div class="md:flex md:items-center md:justify-between">
      <h3 class="text-lg font-medium leading-6 text-black ml-4">
        {{ contract.name }} - {{ contract.address }}
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
        <button
          type="button"
          class="
            ml-3
            inline-flex
            items-center
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
          "
        >
          Create
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
              tab.current
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
  </div>
</template>

<script setup>
import { useFavoritesStore } from "@/stores/favorites";
let favorites = useFavoritesStore();

const props = defineProps(["contract"]);

let tabs = [
  {
    name: "Functions",
    href: "/address/" + props.contract.address,
  },
  {
    name: "Source",
    href: "/address/" + props.contract.address + "/sourcecode",
  },
];
</script>