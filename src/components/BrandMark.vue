<script setup>
const brandMarkUrl = `${import.meta.env.BASE_URL}brand-mark.svg`
</script>

<template>
  <img
    class="block size-9 sm:size-11"
    :src="brandMarkUrl"
    alt=""
    width="48"
    height="48"
    aria-hidden="true"
  />
</template>
