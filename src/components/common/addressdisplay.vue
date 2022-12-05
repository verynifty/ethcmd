<template>
  <div class="w-min">
    <VTooltip>
      <router-link :to="{ name: 'addressinfos', params: { address: value } }"
        >{{ format() }}
      </router-link>
      <template   v-if="rolodethResult != null && rolodethResult.tags != null" #popper
        >
        {{value}}
        <div>
        <span
        
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
          {{ tag }}
        </span></div></template
      >
       <template   v-else #popper
        >{{value}}</template
      >
    </VTooltip>
  </div>
</template>

<script setup>
import axios from "axios";
const props = defineProps(["value"]);
import { ref, watch, onMounted } from "vue";

let rolodethResult = ref(null);

async function loadAddress() {
  try {
    let rolodeth = await axios.get(
      "https://raw.githubusercontent.com/verynifty/RolodETH/main/data/" +
        props.value.toLowerCase()
    );
    rolodethResult.value = rolodeth.data;
  } catch (error) {}
}

function format() {
  if (rolodethResult != null) {
    console.log(rolodethResult);
  }
  if (rolodethResult != null && rolodethResult.name != null) {
    return rolodethResult.name;
  }
  if (rolodethResult != null && rolodethResult.ens != null) {
    return rolodethResult.ens;
  }
  return props.value.substring(0, 6) + "..." + props.value.slice(-6);
}

loadAddress();

watch(
  () => props.value,
  async function () {
    rolodethResult.value = null;
    loadAddress();
  }
);
</script>
