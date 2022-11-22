

<template>
  <div class="h-full bg-gray-100 overflow-scroll">
      hello
  </div>
</template>

<script setup>
import axios from 'axios';

let relayscan = await axios.get("https://www.relayscan.io/api/stats")
relayscan = relayscan.data;
console.log(relayscan)
</script>