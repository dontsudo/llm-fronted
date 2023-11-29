<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <div :class="cn('col-span-full mr-12 flex items-start justify-between lg:mr-0', props.class)">
    <div class="flex w-full flex-col gap-1">
      <h1 class="text-3xl font-bold">{{ props.title }}</h1>
      <p class="text-muted-foreground" v-if="props.description">{{ props.description }}</p>
    </div>
    <div class="flex flex-1 items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>