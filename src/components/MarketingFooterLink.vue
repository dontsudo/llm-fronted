<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router';


const props = defineProps<{
  href: string;
  label: string;
  external?: boolean;
}>()

const isExternal = props.external || props.href?.startsWith("http");
</script>

<template>
  <template v-if="isExternal">
    <a :href="href" target="_blank" rel="noopener noreferrer"
      class="text-muted-foreground hover:text-foreground inline-flex items-center underline underline-offset-4 hover:no-underline">
      {{ label }}
      <ArrowUpRight class="ml-1 h-4 w-4 flex-shrink-0" />
    </a>
  </template>
  <template v-else>
    <RouterLink :to="href"
      class="text-muted-foreground hover:text-foreground inline-flex items-center underline underline-offset-4 hover:no-underline">
      {{ label }}
    </RouterLink>
  </template>
</template>