

<template>
  <div class="flex flex-col h-screen">
    <Header class="" />
    <div class="flex-grow overflow-hidden">
      <Suspense>
        <RouterView class="" v-slot="{ Component }">
          <template v-if="Component">
            <Transition mode="out-in">
                <Suspense>
                  <!-- main content -->
                  <component :is="Component"></component>

                  <!-- loading state -->
                  <template #fallback>
                    <div
                      class="
                     
                        h-full
                        bg-slate-700
                        text-white
                        grid
                        place-items-center
                        text-center
                      "
                    >
                      <div class=" animate-pulse">
                        <svg
                          class="w-20 h-20 mb-2"
                          version="1.1"
                          viewBox="0 0 512 512"
                          xml:space="preserve"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <g id="comp_x5F_116-Ethereum">
                            <g>
                              <polygon
                                points="    277.438,370.529 277.438,470.299 399.954,296.348   "
                                style="
                                  fill: none;
                                  stroke: #FFFFFF;
                                  stroke-width: 20;
                                  stroke-linecap: round;
                                  stroke-linejoin: round;
                                  stroke-miterlimit: 10;
                                "
                              />
                              <polygon
                                points="    385.532,227.682 275.209,42.348 275.209,177.107   "
                                style="
                                  fill: none;
                                  stroke: #FFFFFF;
                                  stroke-width: 20;
                                  stroke-linecap: round;
                                  stroke-linejoin: round;
                                  stroke-miterlimit: 10;
                                "
                              />
                              <polygon
                                points="    277.438,219.138 277.438,318.961 372.419,262.729   "
                                style="
                                  fill: none;
                                  stroke: #FFFFFF;
                                  stroke-width: 20;
                                  stroke-linecap: round;
                                  stroke-linejoin: round;
                                  stroke-miterlimit: 10;
                                "
                              />
                              <polygon
                                points="    123.925,230.375 237.438,39.654 237.438,178.331   "
                                style="
                                  fill: none;
                                  stroke: #FFFFFF;
                                  stroke-width: 20;
                                  stroke-linecap: round;
                                  stroke-linejoin: round;
                                  stroke-miterlimit: 10;
                                "
                              />
                              <polygon
                                points="    238.002,216.348 238.002,321.752 137.438,262.375   "
                                style="
                                  fill: none;
                                  stroke: #FFFFFF;
                                  stroke-width: 20;
                                  stroke-linecap: round;
                                  stroke-linejoin: round;
                                  stroke-miterlimit: 10;
                                "
                              />
                              <polygon
                                points="    237.438,370.227 237.438,472.346 112.046,294.301   "
                                style="
                                  fill: none;
                                  stroke: #FFFFFF;
                                  stroke-width: 20;
                                  stroke-linecap: round;
                                  stroke-linejoin: round;
                                  stroke-miterlimit: 10;
                                "
                              />
                            </g>
                          </g>
                          <g id="Layer_1" />
                        </svg>

                        ETHCMD
                      </div>
                    </div></template
                  >
                </Suspense>
            </Transition>
          </template>
        </RouterView>
      </Suspense>
    </div>
  </div>
</template>

<script setup>
import Header from "./components/template/Header.vue";

import { RouterLink, RouterView } from "vue-router";
import { useWeb3Store } from "@/stores/web3";
const web3 = useWeb3Store();
import { useHistoryStore } from "@/stores/history";
let history = useHistoryStore();
import { useFavoritesStore } from "@/stores/favorites";
let favorites = useFavoritesStore();

web3.setWeb3({ tryFromCache: true });

import { onMounted } from "vue";

onMounted(() => {
  favorites.load();
  history.load();
});
</script>

<style scoped>
</style>
