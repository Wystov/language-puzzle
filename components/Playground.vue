<template>
  <p class="mt-10 p-2 text-center bg-slate-500 rounded-md">
    {{ textToTranslate }}
  </p>
  <draggable
    tag="div"
    class="flex mt-5"
    :list="pickFrom"
    item-key="word"
    group="words"
  >
    <template #item="{ element: word, index }">
      <div class="p-2 cursor-pointer" @click="moveWord(index)">
        {{ word }}
      </div>
    </template>
  </draggable>
  <div class="flex flex-col mt-5 w-full">
    <div
      v-for="(phrase, i) in round.words"
      :key="phrase.id"
      class="h-10 bg-slate-400"
    >
      <draggable
        v-if="i === currentIndex"
        tag="div"
        :list="result"
        item-key="word"
        class="flex"
        group="words"
      >
        <template #item="{ element: word, index }">
          <div class="p-2 cursor-pointer" @click="moveWord(index, true)">
            {{ word }}
          </div></template
        >
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Round } from "~/config/types";
import { shuffle } from "~/utils/shuffleArray";
import draggable from "vuedraggable";

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
