<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { FileText, LibraryBig, Settings } from 'lucide-vue-next'
// import Shell from '@/components/Shell.vue';

</script>

<template>
  <div class="flex h-full flex-col justify-between text-lg">
    <ul class="grid gap-1">
      <li class="w-full">
        <RouterLink to="/app/dashboard" class="group" v-slot="{ isActive }">
          <div aria-label="dashboard" :class="[
            isActive && 'bg-muted/50 border-border text-foreground',
            'hover:bg-muted/50 hover:text-foreground text-muted-foreground group flex w-full min-w-[180px] items-center rounded-md border border-transparent px-3 py-1'
          ]">
            <FileText class="mr-2 h-4 w-4" />
            Dashboard
          </div>
        </RouterLink>
        <RouterLink to="/app/library" class="group" v-slot="{ isActive }">
          <div aria-label="library" :class="[
            isActive && 'bg-muted/50 border-border text-foreground',
            'hover:bg-muted/50 hover:text-foreground text-muted-foreground group flex w-full min-w-[180px] items-center rounded-md border border-transparent px-3 py-1'
          ]">
            <LibraryBig class="mr-2 h-4 w-4" />
            Community
          </div>
        </RouterLink>
      </li>
    </ul>
    <ul>
      <li class="w-full">
        <RouterLink to="/app/setting" class="group" v-slot="{ isActive }">
          <div aria-label="setting" :class="[
            isActive && 'bg-muted/50 border-border text-foreground',
            'hover:bg-muted/50 hover:text-foreground text-muted-foreground group flex w-full min-w-[180px] items-center rounded-md border border-transparent px-3 py-1'
          ]">
            <Settings class="mr-2 h-4 w-4" />
            Settings
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>