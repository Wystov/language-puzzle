<template>
  <h1 class="text-3xl">Welcome {{ store.user }}</h1>
  <RouterLink
    to="/game"
    class="rounded bg-green-500 mt-4 px-3 py-2 uppercase hover:bg-green-600"
    >Let's play</RouterLink
  >
</template>

<script setup lang="ts">
import { store } from "~/store";
</script>
