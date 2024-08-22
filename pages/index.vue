<template>
  <main class="flex flex-col items-center justify-center">
    <AppLogin v-if="!store.user" />
    <AppWelcome v-else />
  </main>
</template>

<script setup lang="ts">
  import { store } from '~/store';
</script>
