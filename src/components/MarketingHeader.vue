<script setup lang="ts">
import { cn } from '@/lib/utils';
import { RouterLink } from 'vue-router';
import { ArrowUpRight } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import BrandName from '@/components/BrandName.vue';
import MarketingMenu from '@/components/MarketingMenu.vue';

const props = defineProps<{
  class?: string;
}>()

</script>

<template>
  <header :class="cn('grid w-full grid-cols-2 gap-2 sm:grid-cols-5', props.class)">
    <div class="flex items-center sm:col-span-1">
      <BrandName />
    </div>
    <div class="hidden items-center justify-center sm:col-span-3 sm:flex sm:gap-3">
      <Button variant="link" as-child>
        <RouterLink to="/blog">Blog</RouterLink>
      </Button>
      <Button variant="link" as-child>
        <RouterLink to="/changelog">Changelog</RouterLink>
      </Button>
      <Button variant="link" as-child>
        <a href="https://junghwanhas.notion.site/dfc3ca1d381c42d5bf88570f0f90c436?pvs=4" target="_blank"
          class="flex items-center">
          Docs
          <ArrowUpRight class="ml-1 h-4 w-4 flex-shrink-0" />
        </a>
      </Button>
    </div>
    <div class="flex items-center justify-end gap-3 sm:col-span-1">
      <div class="block sm:hidden">
        <MarketingMenu />
      </div>
      <Button as-child class="rounded-full">
        <RouterLink to="/auth/sign-in">Login</RouterLink>
      </Button>
    </div>
  </header>
</template>