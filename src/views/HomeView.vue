

<template>
  <div class="h-full bg-gray-100">
    <ContractSearch />
    <div class="w-full  p-5">
      <div class="w-full bg-white shadow sm:rounded-lg">
        <div class="pt-2 pl-3">Favorite contracts</div>
        <div class="overflow-hidden bg-white ">
          <ul role="list" class="divide-y divide-gray-200">
            <li v-for="fav in favorites.$state.contracts" :key="fav.address">
              <router-link
                :to="'/address/' + fav.address"
                class="block hover:bg-gray-50"
              >
                <div class="flex items-center px-4 py-4 sm:px-6">
                  <div class="flex min-w-0 flex-1 items-center">
                    <div class="flex-shrink-0">
                      <img
                        class="h-12 w-12 rounded-full"
                        :src="
                          'https://avatars.dicebear.com/api/jdenticon/' +
                          fav.address +
                          '.svg'
                        "
                        alt=""
                      />
                    </div>
                    <div
                      class="
                        min-w-0
                        flex-1
                        px-4
                        md:grid md:grid-cols-2 md:gap-4
                      "
                    >
                      <div>
                        <p class="truncate text-sm font-medium text-indigo-600">
                          {{ fav.name }}
                        </p>
                        <p class="mt-2 flex items-center text-sm text-gray-500">
                          <span class="truncate">{{ fav.address }}</span>
                        </p>
                      </div>
                     <!-- <div class="hidden md:block">
                        <div>
                          <p class="text-sm text-gray-900">
                            Applied on
                            {{ " " }}
                            a
                          </p>
                          <p
                            class="mt-2 flex items-center text-sm text-gray-500"
                          >
                            {{ fav.address }}
                          </p>
                        </div>
                      </div>-->
                    </div>
                  </div>
                  <div>
                    <Menu as="div" class="relative inline-block text-left">
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
                        @click.stop
                      >
                        <MenuItems
                          @click.prevent="
                            favorites.removeFavoriteContract(fav.address)
                          "
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
                              >
                                Remove from favorites
                              </div>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </transition>
                    </Menu>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
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