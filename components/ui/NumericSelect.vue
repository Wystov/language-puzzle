<template>
  <label>
    {{ label }}:
    <select
      v-model="model"
      class="mr-4 mt-10 text-black"
    >
      <option
        v-for="i in max"
        :key="i"
        :value="i"
      >
        {{ i }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
  defineProps<{
    label: string;
    max: number;
  }>();

  const model = defineModel<number>();
</script>
