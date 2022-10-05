

<template>
  <div>
    <ContractSearch />

    FAVORITES:
    <div class="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="fav in favorites.$state.contracts" :key="fav.address">
          <router-link
            :to="'/address/' + fav.address"
            class="block hover:bg-gray-50"
          >
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
                <Menu  as="div" class="relative inline-block text-left">
                  <div>
                    <MenuButton
                      class="
                        inline-flex
                        w-full
                        justify-center
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
                        focus:ring-offset-gray-100
                      "
                    >
                      <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
                    </MenuButton>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      @click.stop="favorites.removeFavoriteContract(fav.address)"
                      class="
                        absolute
                        right-0
                        z-10
                        mt-2
                        w-56
                        origin-top-right
                        rounded-md
                        bg-white
                        shadow-lg
                        ring-1 ring-black ring-opacity-5
                        focus:outline-none
                      "
                    >
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                          <div
                            :class="[
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm',
                            ]"
                            >Remove from favorites</div
                          >
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
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
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

import { useFavoritesStore } from "@/stores/favorites";
let favorites = useFavoritesStore();
</script>