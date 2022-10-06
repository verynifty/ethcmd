

<template>
<div class="flex flex-col h-screen">
  <Header class="" />
  <div class="bg-green-500  flex-grow overflow-hidden">
  <Suspense>
    <RouterView class="" />
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
