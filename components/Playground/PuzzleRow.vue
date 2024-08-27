<template>
  <draggable
    v-if="isActive"
    tag="div"
    :list="words"
    item-key="word"
    :class="`flex h-10 ${reverse ? 'outline -outline-offset-2' : ''}`"
    group="words"
    @change="handleDragEnd"
  >
    <template #item="{ element: word, index }">
      <div
        :class="`grow cursor-pointer ${word.length ? 'border-2' : ''} p-2 text-center`"
        @click="moveWord({ i: index, reverse })"
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
      class="grow border-2 p-2 text-center"
    >
      {{ word }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import draggable from 'vuedraggable';
  import type { DragType, moveWordType } from '~/config/types';

  const props = defineProps<{
    words: string[];
    reverse?: boolean;
    isActive?: boolean;
  }>();

  const emit = defineEmits(['moveWord']);

  const moveWord: moveWordType = (options) => {
    emit('moveWord', options);
  };

  const handleDragEnd = (drag: DragType) => {
    moveWord({
      i: drag.removed?.oldIndex ?? -1,
      reverse: props.reverse,
      drag,
    });
  };
</script>
