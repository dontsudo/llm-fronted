<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';

// Define the loading variants using cva
const loadingVariants = cva(
  'animate-pulse rounded-full direction-alternate duration-700',
  {
    variants: {
      variant: {
        default: 'bg-primary-foreground',
        inverse: 'bg-primary',
      },
      size: {
        default: 'h-1 w-1',
        lg: 'h-1.5 w-1.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Define props
const props = defineProps<{
  className?: String,
  variant?: "default" | "inverse" | null | undefined,
  size?: "default" | "lg" | null | undefined
}>();

// Compute the loading class
const loadingClass = computed(() => loadingVariants({
  variant: props.variant,
  size: props.size
}));
</script>


<template>
  <div :class="['flex items-center justify-center gap-1', className]" v-bind="$attrs">
    <div :class="loadingClass" />
    <div :class="[loadingClass, 'delay-150']" />
    <div :class="[loadingClass, 'delay-300']" />
  </div>
</template>
