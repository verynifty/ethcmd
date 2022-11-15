<template>
  <router-link :to="{ name: 'addressinfos', params: { address: value } }"
    >{{ format() }}
    <span v-if="rolodethResult != null && rolodethResult.tags != null"
    v-for="tag in rolodethResult.tags"
      class="
        text-xs
        font-semibold
        inline-block
        py-1
        px-2
        uppercase
        rounded
        text-slate-600
        bg-slate-200
        uppercase
        last:mr-0
        mr-1
      "
    >
      {{tag}}
    </span>
  </router-link>
</template>

<script setup>
import axios from "axios";

const props = defineProps(["value"]);
let rolodethResult;

let rolodeth = await axios.get(
  "https://rolodeth.vercel.app/address/" + props.value
);
rolodethResult = rolodeth.data;

function format() {
  if (rolodethResult != null && rolodethResult.name != null) {
    return rolodethResult.name;
  }
  return props.value.substring(0, 6) + "..." + props.value.slice(-6);
}
</script>
