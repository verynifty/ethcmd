<template>
  {{ format() }}
</template>

<script setup>
import axios from "axios";

const props = defineProps(["value"]);
let funcs = null;
const signatureReturn = await axios.get(
  `https://sig.eth.samczsun.com/api/v1/signatures?function=${props.value}`
);
console.log("SIG", signatureReturn.data.result.function[props.value]);
funcs = signatureReturn.data.result.function[props.value];
function format() {
  if (funcs != null) {
    return funcs[0].name;
  }
  return props.value;
}
</script>
