<template>
  <div>
      <ddd />
    <v-ace-editor
      v-model:value="source"
      @init="editorInit"
      lang="solidity"
      theme="chaos"
      style="height: 600px"
      :readonly="true"
      :printMargin="false"
      :wrap="true"
    />
  </div>
</template>

<script setup>
import { watch, ref, computed } from "vue";

const props = defineProps(["contract", "sourceFile"]);

let source = ref("")
watch(
  () => props.sourceFile,
  function () {
    source.value = props.contract.sourceCode.sources[props.sourceFile].content
  }
);
</script>