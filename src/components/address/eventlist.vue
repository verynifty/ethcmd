<template>
  <div class="overflow-hidden bg-white">
    <div v-if="event != null">
      {{event}} {{address}}
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import { useContractStore } from "@/stores/contracts";
import { useWeb3Store } from "@/stores/web3";

let contracts = useContractStore();
const web3 = useWeb3Store();

const props = defineProps(["event", "address"]);

let events = null

async function getEvents() {
    console.log("get events")
    await contracts.getEvents(props.address)
}

watch(
  () => props.event,
  async function () {
   await getEvents()
  }
);
</script>