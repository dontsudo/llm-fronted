<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import Shell from '@/components/Shell.vue';
</script>

<template>
  <div class="relative mx-auto w-full min-h-screen flex flex-col items-center justify-center p-4 lg:p-8">
    <div class="flex w-full flex-1 gap-6 lg:gap-8">
      <Shell class="hidden max-h-screen max-w-min shrink-0 lg:sticky lg:block">
        <Sidebar />
      </Shell>
      <main class="z-10 flex w-full flex-1 flex-col items-start justify-center">
        <Shell class="relative flex-1 overflow-x-hidden">
          <router-view></router-view>
        </Shell>
      </main>
    </div>
  </div>
</template>


