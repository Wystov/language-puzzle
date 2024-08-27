<template>
  <main>
    <div v-if="status === 'pending'">Loading...</div>
    <template v-else-if="status === 'success' && data">
      <UiNumericSelect
        v-model="currentLevel"
        label="Level"
        :max="lvlCount"
      />
      <UiNumericSelect
        v-model="currentRound"
        label="Round"
        :max="data.roundsCount"
      />
      <Playground
        :round="data.rounds[currentRound - 1]"
        @next-round="nextRound"
      />
    </template>
    <div v-else-if="status === 'error'">Failed to get game data</div>
  </main>
</template>

<script setup lang="ts">
  import type { Data } from '~/config/types';
  import { contentPath, contentType, lvlCount } from '~/config/constants';

  definePageMeta({
    middleware: 'auth',
  });

  const currentLevel = ref(1);
  const currentRound = ref(1);

  const dataPath = computed(
    () =>
      `${contentPath}/${contentType.data}/wordCollectionLevel${currentLevel.value}.json`
  );

  const { data, status } = await useLazyFetch(dataPath, {
    transform: (data: string): Data => JSON.parse(data),
  });

  const nextRound = () => {
    if (
      currentRound.value === data.value?.roundsCount &&
      currentLevel.value < lvlCount
    ) {
      currentLevel.value++;
      currentRound.value = 1;
      return;
    }
    currentRound.value++;
  };
</script>
