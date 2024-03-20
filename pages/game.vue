<template>
  <main>
    <span>Level: </span>
    <select v-model="currentLevel" class="text-black mr-4 mt-10">
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
      <Playground :round="data.rounds[currentRound - 1]" />
    </template>
    <div v-else>Failed to get game data</div>
  </main>
</template>

<script setup lang="ts">
import type { Data } from "~/config/types";
import { dataPath, lvlCount } from "~/config/constants";

definePageMeta({
  middleware: "auth",
});

const currentLevel = ref(1);
const currentRound = ref(1);

const path = computed(
  () => `${dataPath}/wordCollectionLevel${currentLevel.value}.json`
);

const { data, pending } = await useLazyFetch(path, {
  transform: (data: string): Data => JSON.parse(data),
});
</script>
~/constants/constants
