<template>
  <draggable tag="div" :list="words" item-key="word" class="flex" group="words">
    <template #item="{ element: word, index }">
      <div class="p-2 cursor-pointer" @click="moveWord(index, reverse)">
        {{ word }}
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";

defineProps<{ words: string[]; reverse?: boolean }>();

const emit = defineEmits(["moveWord"]);

const moveWord = (i: number, reverse?: boolean) => emit("moveWord", i, reverse);
</script>
