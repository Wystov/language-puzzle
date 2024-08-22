<template>
  <p class="mt-10 rounded-md bg-slate-500 p-2 text-center">
    {{ textToTranslate }}
  </p>
  <PlaygroundPuzzleRow
    v-if="pickFrom.length"
    :words="pickFrom"
    class="mt-3"
    is-active
    @move-word="moveWord"
  />
  <div
    v-else
    class="mt-5 flex justify-center gap-2"
  >
    <button
      class="rounded px-2 py-1"
      :class="[
        isRowSolved
          ? 'bg-green-500 hover:bg-green-600'
          : 'bg-slate-700 hover:bg-slate-600',
      ]"
      @click="isRowSolved ? nextRow() : checkRow()"
    >
      {{ isRowSolved ? 'Continue' : 'Check' }}
    </button>
  </div>
  <div class="mt-5 flex w-full flex-col bg-slate-600">
    <template
      v-for="(phrase, i) in round.words"
      :key="phrase.id"
    >
      <PlaygroundPuzzleRow
        :words="
          i < currentIndex
            ? phrase.textExample.split(' ')
            : i === currentIndex
              ? result
              : []
        "
        :is-active="i === currentIndex"
        reverse
        @move-word="moveWord"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  import type { Round } from '~/config/types';
  import { shuffle } from '~/utils/shuffleArray';

  const props = defineProps<{ round: Round }>();

  // const emits = defineEmits(['nextRound']);

  const currentIndex = ref(0);

  const currentPhrase = computed(() => {
    return props.round.words[currentIndex.value];
  });

  // const phraseCount = computed(() => {
  //   return props.round.words.length;
  // });

  const textToTranslate = computed(() => {
    return currentPhrase.value.textExampleTranslate;
  });

  const words = computed(() => {
    return shuffle(currentPhrase.value.textExample.split(' '));
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

  const isRowSolved = ref(false);
  // const isPuzzleSolved = ref(false);

  const checkRow = () => {
    if (result.value.join(' ') === currentPhrase.value.textExample)
      isRowSolved.value = true;
  };

  const nextRow = () => {
    isRowSolved.value = false;
    currentIndex.value++;
    console.log('continue');
    return;
  };

  // const nextRound = () => {
  //   isPuzzleSolved.value = false;
  //   emits('nextRound');
  // };
</script>
