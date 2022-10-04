<script setup>
import { RouterLink, RouterView } from "vue-router";
import ConnectButton from "./components/account/ConnectButton.vue";
import { useWeb3Store } from "@/stores/web3";
const web3 = useWeb3Store();
import { useHistoryStore } from "@/stores/history";
let history = useHistoryStore();
import { useFavoritesStore } from "@/stores/favorites";
let favorites = useFavoritesStore();

web3.setWeb3({tryFromCache: true})

import { onMounted } from 'vue'

onMounted(() => {
 favorites.load();
  history.load();

})

</script>

<template>
  <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div
        class="
          flex flex-wrap
          justify-between
          items-center
          mx-auto
          max-w-screen-xl
        "
      >
        <router-link to="/" class="flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7650/7650392.png"
            class="mr-3 h-6 sm:h-9"
          />
          <span
            class="
              self-center
              text-xl
              font-semibold
              whitespace-nowrap
              dark:text-white
            "
            >ETHCMD</span
          >
        </router-link>
        <div class="flex items-center lg:order-2">
          <a
            href="#"
            class="
              text-gray-800
              dark:text-white
              hover:bg-gray-50
              focus:ring-4 focus:ring-gray-300
              font-medium
              rounded-lg
              text-sm
              px-4
              lg:px-5
              py-2
              lg:py-2.5
              mr-2
              dark:hover:bg-gray-700
              focus:outline-none
              dark:focus:ring-gray-800
            "
          ></a>
          <ConnectButton />
        </div>
        <div
          class="
            hidden
            justify-between
            items-center
            w-full
            lg:flex lg:w-auto lg:order-1
          "
          id="mobile-menu-2"
        >
          <ul
            class="
              flex flex-col
              mt-4
              font-medium
              lg:flex-row lg:space-x-8 lg:mt-0
            "
          >
            <li>
              <a
                href="#"
                class="
                  block
                  py-2
                  pr-4
                  pl-3
                  text-white
                  rounded
                  bg-primary-700
                  lg:bg-transparent lg:text-primary-700 lg:p-0
                  dark:text-white
                "
                aria-current="page"
                >Home</a
              >
            </li>
            <li>
              <a
                href="#"
                class="
                  block
                  py-2
                  pr-4
                  pl-3
                  text-gray-700
                  border-b border-gray-100
                  hover:bg-gray-50
                  lg:hover:bg-transparent
                  lg:border-0
                  lg:hover:text-primary-700
                  lg:p-0
                  dark:text-gray-400
                  lg:dark:hover:text-white
                  dark:hover:bg-gray-700 dark:hover:text-white
                  lg:dark:hover:bg-transparent
                  dark:border-gray-700
                "
                >Company</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style scoped>

</style>
