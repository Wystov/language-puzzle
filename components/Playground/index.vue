<template>
  <p class="mt-10 p-2 text-center bg-slate-500 rounded-md">
    {{ textToTranslate }}
  </p>
  <PlaygroundPuzzleRow
    v-if="pickFrom.length"
    :words="pickFrom"
    @move-word="moveWord"
  />
  <div v-else class="flex justify-center gap-2 mt-5">
    <button class="px-2 py-1 bg-slate-700 rounded hover:bg-slate-600">
      Check
    </button>
  </div>
  <div class="flex flex-col mt-5 w-full">
    <div
      v-for="(phrase, i) in round.words"
      :key="phrase.id"
      class="h-10 bg-slate-400"
    >
      <PlaygroundPuzzleRow
        v-if="i === currentIndex"
        :words="result"
        @move-word="moveWord"
        reverse
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Round } from "~/config/types";
import { shuffle } from "~/utils/shuffleArray";

const props = defineProps<{ round: Round }>();

const currentIndex = ref(0);

const currentPhrase = computed(() => {
  return props.round.words[currentIndex.value];
});

const textToTranslate = computed(() => {
  return currentPhrase.value.textExampleTranslate;
});

const words = computed(() => {
  return shuffle(currentPhrase.value.textExample.split(" "));
});

const pickFrom = ref([...words.value]);

const result = ref<string[]>([]);

watch(words, () => {
  pickFrom.value = [...words.value];
  result.value = [];
});

const moveWord = (i: number, reverse?: boolean) => {
  const from = reverse ? result.value : pickFrom.value;
  const to = reverse ? pickFrom.value : result.value;
  const word = from.splice(i, 1)[0];
  to.push(word);
};
</script>
