<template>
  <div>
      {{ type }} {{ getValue() }}
  </div>
</template>

<script setup>
import { watch, ref, computed } from "vue";

const props = defineProps(["value", "type", "name"]);

function getValue() {
    return props.value
}

</script>