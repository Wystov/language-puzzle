<template>
  <h1 class="text-3xl">Hi, what's your name?</h1>
  <form @submit.prevent="submitInput">
    <input v-model.trim="name" class="rounded mt-4 mr-2 p-2 text-black" />
    <button
      type="submit"
      class="rounded bg-green-500 px-3 py-2 uppercase hover:bg-green-600"
    >
      start
    </button>
  </form>
  <p class="text-red-500 mt-2 h-2">{{ error }}</p>
</template>

<script setup lang="ts">
import { lsKeys } from "~/config/constants";
import { store } from "~/store";

const name = ref("");
const error = ref("");

const submitInput = () => {
  if (name.value.length < 4) {
    error.value = "Name must be at least 4 characters";
    return;
  }
  error.value = "";
  localStorage.setItem(lsKeys.activeUser, name.value);
  store.user = name.value;
  navigateTo(`/game`);
};
</script>
~/constants/constants
