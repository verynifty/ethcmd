<template>
  <div>
      <ddd />
    <v-ace-editor
      v-model:value="source"
      @init="editorInit"
      lang="html"
      theme="chrome"
      style="height: 600px"
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