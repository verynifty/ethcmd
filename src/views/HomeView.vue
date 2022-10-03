

<template>
  <div>
    <ContractSearch />
   FAVORITES:
    <div class="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="fav in favorites.$state.contracts" :key="fav.address">
          <router-link :to="'/address/' + fav.address" class="block hover:bg-gray-50">
            <div class="flex items-center px-4 py-4 sm:px-6">
              <div
                class="
                  min-w-0
                  flex-1
                  sm:flex sm:items-center sm:justify-between
                "
              >
                <div class="truncate">
                  <div class="flex text-sm">
                    <p class="truncate font-medium text-indigo-600">
                      {{ fav.name }}
                    </p>
                    <p class="ml-1 flex-shrink-0 font-normal text-gray-500">
                      @ {{ fav.address }}
                    </p>
                  </div>
                  <div class="mt-2 flex">
                    <div class="flex items-center text-sm text-gray-500">
                      <!--<CalendarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <p>
                      Closing on
                      {{ ' ' }}
                      <time :datetime="position.closeDate">{{ position.closeDateFull }}</time>
                    </p>
                    --></div>
                  </div>
                </div>
                <div class="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                  <!--
                <div class="flex -space-x-1 overflow-hidden">
                  <img v-for="applicant in position.applicants" :key="applicant.email" class="inline-block h-6 w-6 rounded-full ring-2 ring-white" :src="applicant.imageUrl" :alt="applicant.name" />
                </div>
                --></div>
              </div>
              <div class="ml-5 flex-shrink-0">
                <ChevronRightIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import ContractSearch from "@/components/address/search.vue";

import { useFavoritesStore } from "@/stores/favorites";
let favorites = useFavoritesStore();
</script>