<template>
  <p class="mt-10 p-2 text-center bg-slate-500 rounded-md">
    {{ textToTranslate }}
  </p>
  <div class="flex mt-5">
    <div
      v-for="(word, i) in pickFrom"
      :key="word"
      class="p-2 cursor-pointer"
      @click="moveWord(i)"
    >
      {{ word }}
    </div>
  </div>
  <div class="flex flex-col mt-5 w-full">
    <div
      v-for="(phrase, i) in round.words"
      :key="phrase.id"
      class="h-10 bg-slate-400"
    >
      <div v-if="i === currentIndex" class="flex">
        <div
          v-for="(word, i) in result"
          :key="word"
          class="p-2 cursor-pointer"
          @click="moveWord(i, true)"
        >
          {{ word }}
        </div>
      </div>
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
