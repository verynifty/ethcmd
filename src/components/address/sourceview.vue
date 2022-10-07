<template>
  <v-ace-editor
    class="h-full"
    v-model:value="source"
    @init="editorInit"
    lang="solidity"
    theme="chaos"
    :readonly="true"
    :printMargin="false"
    :wrap="true"
  />
</template>

<script setup>
import { watch, ref, computed } from "vue";

const props = defineProps(["contract", "sourceFile"]);

let source = ref("");
watch(
  () => props.sourceFile,
  function () {
    source.value = props.contract.sourceCode.sources[props.sourceFile].content;
  }
);
</script>