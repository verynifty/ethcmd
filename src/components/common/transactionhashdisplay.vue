<template>
  {{ format() }}
</template>

<script setup>
    const props = defineProps(["value"]);

    function format() {
        return (props.value.substring(0, 6) + '...' + (props.value.slice(-6)))
    }
</script>
