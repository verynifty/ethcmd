<template>
  {{ getName }}
</template>

<script setup>
import { watch, computed, ref } from "vue";

import axios from "axios";

const props = defineProps(["value"]);
let funcs = ref(null);

async function getSignature() {
  console.log("get signature", props.value);

  const signatureReturn = await axios
    .get(
      `https://sig.eth.samczsun.com/api/v1/signatures?function=${props.value}`
    )
    .then(function (signatureReturn) {
      if (
        signatureReturn.data != null &&
        signatureReturn.data.result != null &&
        signatureReturn.data.result.function != null &&
        signatureReturn.data.result.function[props.value].length > 0
      ) {
        funcs.value = signatureReturn.data.result.function[props.value];
        console.log(funcs)
      } else {
        funcs.value = null;
      }
    });
}

await getSignature();

watch(
  () => props.value,
  async function () {
    await getSignature();
  }
);



function format() {
  if (funcs.value != null) {
    if (funcs.value[0].name.length > 60) return funcs.value[0].name.slice(0, 60) + "...";
    else return funcs.value[0].name;
  }
  return props.value;
}

let getName = computed(format);

</script>
