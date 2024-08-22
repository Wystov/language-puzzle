<template>
  <header class="flex w-full justify-between">
    <NuxtLink
      to="/"
      class="logo text-lg font-bold tracking-wider"
    >
      EPuzzle
    </NuxtLink>
    <template v-if="store.user">
      <nav>
        <ul class="flex gap-2">
          <li
            v-for="item in navItems"
            :key="item.name"
          >
            <NuxtLink
              :to="item.path"
              class="align-middle uppercase hover:text-green-500"
            >
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <button
        class="rounded bg-slate-700 px-2 py-1 hover:bg-slate-600"
        @click="logout"
      >
        Logout
      </button>
    </template>
  </header>
</template>

<script setup lang="ts">
  import { store } from '~/store';
  import { lsKeys } from '~/config/constants';

  const navItems = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Game',
      path: '/game',
    },
  ];

  const logout = () => {
    store.user = null;
    localStorage.removeItem(lsKeys.activeUser);
    navigateTo('/');
  };
</script>

<style scoped>
  .router-link-exact-active:not(.logo) {
    @apply text-green-500;
  }
</style>
~/constants/constants
