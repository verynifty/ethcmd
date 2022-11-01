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
if (signatureReturn.data.result.function[props.value].length > 0) {
  funcs = signatureReturn.data.result.function[props.value];
}

function format() {
  if (funcs != null) {
      if (funcs[0].name.length > 60)
    return funcs[0].name.slice(0, 60) + "...";
    else
     return funcs[0].name
  }
  return props.value;
}

</script>
