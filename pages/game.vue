<template>
  <main>
    <span>Level: </span>
    <select v-model="currentLevel" class="text-black mr-2 mt-4">
      <option v-for="i in lvlCount" :key="i" :value="i">{{ i }}</option>
    </select>
    <div v-if="pending">Loading...</div>
    <template v-else-if="data">
      <span>Round: </span>
      <select v-model="currentRound" class="text-black">
        <option v-for="i in data.roundsCount" :key="i" :value="i">
          {{ i }}
        </option>
      </select>
    </template>
    <div v-else>Failed to get game data</div>
  </main>
</template>

<script setup lang="ts">
import type { LvlData } from "~/config/types";
import { dataPath, lvlCount } from "~/constants";

definePageMeta({
  middleware: "auth",
});

const currentLevel = ref(1);
const currentRound = ref(1);

const path = computed(
  () => `${dataPath}/wordCollectionLevel${currentLevel.value}.json`
);

const { data, pending } = await useLazyFetch(path, {
  transform: (data: string): LvlData => JSON.parse(data),
});
</script>
