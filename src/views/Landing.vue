<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ChevronRight } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Shell from '@/components/Shell.vue';
</script>

<template>
  <Shell class="text-center">
    <RouterLink to="#" target="_blank" rel="noreferrer">
      <Badge variant="outline">
        Announcement Post
        <ChevronRight class="ml-1 h-3 w-3" />
      </Badge>
    </RouterLink>
    <h1 class="text-foreground font-cal mb-6 mt-2 text-3xl">
      Open-source prompt engineering service
    </h1>
    <p class="text-muted-foreground mx-auto mb-6 max-w-lg text-lg">
      Ghostform is an open-source prompt engineering service
    </p>
    <div class="my-4 flex justify-center items-center gap-2">
      <div class="text-center sm:block sm:text-right space-x-2">
        <Button class="w-48 rounded-full sm:w-auto" as-child>
          <RouterLink to="/app">Get Started</RouterLink>
        </Button>
        <Button class="w-48 rounded-full sm:w-auto" variant="outline" as-child>
          <a href="https://github.com/ghost-form/frontend" target="_blank">Star on GitHub</a>
        </Button>
      </div>
    </div>
  </Shell>
</template>
