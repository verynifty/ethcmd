<template>
<router-link :to="{ name: 'transaction', params: { hash: value }}">{{ format() }}</router-link>
  
</template>

<script setup>
    const props = defineProps(["value"]);

    function format() {
        return (props.value.substring(0, 6) + '...' + (props.value.slice(-6)))
    }
</script>
