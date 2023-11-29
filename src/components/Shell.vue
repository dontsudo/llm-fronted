<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = defineProps({
  class: String
});
</script>

<template>
  <div :class="cn('border-border w-full rounded-lg border px-3 py-4 backdrop-blur-[2px] md:p-6', props.class)">
    <slot />
  </div>
</template>
