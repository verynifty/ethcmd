<template>
  <div class="w-min">
    <VTooltip>
      <router-link :to="{ name: 'addressinfos', params: { address: value } }"
        >{{ format }}
        <span
          v-if="
            rolodethResult != null &&
            rolodethResult.tags != null &&
            rolodethResult.tags.includes('erc20')
          "
          class="
            text-xs
            font-semibold
            inline-block
            py-1
            px-2
            uppercase
            rounded
            text-cyan-600
            bg-cyan-200
            uppercase
            last:mr-0
            mr-1
          "
        >
          ERC20
        </span>
        <span
          v-if="
            rolodethResult != null &&
            rolodethResult.tags != null &&
            rolodethResult.tags.includes('erc721')
          "
          class="
            text-xs
            font-semibold
            inline-block
            py-1
            px-2
            uppercase
            rounded
            text-stone-600
            bg-stone-200
            uppercase
            last:mr-0
            mr-1
          "
        >
          ERC721
        </span>
      </router-link>
      <template
        v-if="rolodethResult != null && rolodethResult.tags != null"
        #popper
      >
        {{ value }}
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
          </span>
        </div></template
      >
      <template v-else #popper>{{ value }}</template>
    </VTooltip>
  </div>
</template>

<script setup>
import axios from "axios";
const props = defineProps(["value"]);
import { ref, watch, computed } from "vue";

let loaded = ref(false);
let rolodethResult = ref(null);

function loadAddress() {
  try {
    let rolodeth = axios
      .get(
        "https://rolodeth.ethcmd.com/address/" +
          props.value.toLowerCase()
      )
      .then(function (rolodeth) {
        rolodethResult.value = rolodeth.data;
        loaded.value = true;
      });
  } catch (error) {
    console.log(error);
  }
}

const format = computed(() => {
  if (loaded && rolodethResult != null && rolodethResult.value != null) {
    if (rolodethResult.value.name != null) {
      return rolodethResult.value.name;
    }
    if (rolodethResult.value.ens != null) {
      return rolodethResult.value.ens;
    }
  }
  return props.value.substring(0, 6) + "..." + props.value.slice(-6);
});

loadAddress();

watch(
  () => props.value,
  async function () {
    rolodethResult.value = null;
    loaded.value = false;
    loadAddress();
  }
);
</script>
