<template>
  <p class="mt-10 rounded-md bg-slate-500 p-2 text-center">
    {{ textToTranslate }}
  </p>
  <PlaygroundPuzzleRow
    :words="pickFrom"
    class="mt-3"
    is-active
    @move-word="moveWord"
  />
  <div class="mt-5 flex justify-center gap-2">
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
  <div
    class="mt-5 flex w-full flex-col bg-cover"
    :style="{
      backgroundImage: 'url(' + bgImgUrl + ')',
    }"
  >
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
        :class="[i > currentIndex ? 'backdrop-blur-[2px]' : '']"
        @move-word="moveWord"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { contentPath, contentType } from '~/config/constants';
  import type { moveWordType, Round } from '~/config/types';
  import { shuffle } from '~/utils/shuffleArray';

  const props = defineProps<{ round: Round }>();

  const emits = defineEmits(['nextRound']);

  const bgImgUrl = computed(() => {
    return `${contentPath}/${contentType.images}/${props.round.levelData.imageSrc}`;
  });

  const currentIndex = ref(0);

  const currentPhrase = computed(() => {
    return props.round.words[currentIndex.value];
  });

  const textToTranslate = computed(() => {
    return currentPhrase.value.textExampleTranslate;
  });

  const words = computed(() => {
    return shuffle(currentPhrase.value.textExample.split(' '));
  });

  const pickFrom = ref([...words.value]);

  const result = ref<string[]>(Array(words.value.length).fill(''));

  watch(words, () => {
    pickFrom.value = [...words.value];
    result.value = Array(words.value.length).fill('');
  });

  const moveWord: moveWordType = ({ i, reverse, drag }) => {
    const from = reverse ? result : pickFrom;
    const to = reverse ? pickFrom : result;

    if (drag) {
      if (drag?.added) {
        let index = drag.added.newIndex;
        let word = from.value[index];
        while (word.length) {
          index = index === from.value.length - 1 ? 0 : index + 1;
          word = from.value[index];
        }
        from.value.splice(index, 1);
      }
      if (drag?.removed) {
        from.value.splice(drag.removed.oldIndex, 0, '');
      }
      return;
    }

    const word = from.value[i];
    if (!word.length) return;
    from.value.splice(i, 1, '');
    to.value.splice(to.value.indexOf(''), 1, word);
  };

  const isRowSolved = ref(false);

  const checkRow = () => {
    if (result.value.join(' ') === currentPhrase.value.textExample)
      isRowSolved.value = true;
  };

  const nextRow = () => {
    if (currentIndex.value === props.round.words.length - 1) {
      nextRound();
      return;
    }
    isRowSolved.value = false;
    currentIndex.value++;
  };

  const nextRound = () => {
    isRowSolved.value = false;
    currentIndex.value = 0;
    emits('nextRound');
  };
</script>
