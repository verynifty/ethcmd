

<template>
  <div class="h-full bg-gray-100 overflow-scroll">
      hello
  </div>
</template>

<script setup>
import axios from 'axios';

let gasprice = await axios.get("http://ethgas.watch/api/gas")
gasprice = gasprice.data;
console.log(gasprice)
</script>