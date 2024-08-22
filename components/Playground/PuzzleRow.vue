<template>
  <draggable
    v-if="isActive"
    tag="div"
    :list="words"
    item-key="word"
    :class="`flex h-10 ${reverse ? 'bg-slate-400' : 'bg-transparent'}`"
    group="words"
  >
    <template #item="{ element: word, index }">
      <div
        class="cursor-pointer p-2"
        @click="moveWord(index, reverse)"
      >
        {{ word }}
      </div>
    </template>
  </draggable>
  <div
    v-else
    class="flex h-10"
  >
    <div
      v-for="word in words"
      :key="word"
      class="p-2"
    >
      {{ word }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import draggable from 'vuedraggable';

  defineProps<{ words: string[]; reverse?: boolean; isActive?: boolean }>();

  const emit = defineEmits(['moveWord']);

  const moveWord = (i: number, reverse?: boolean) =>
    emit('moveWord', i, reverse);
</script>
