<script setup lang="ts">
import { RouterView } from 'vue-router'
import MarketingHeader from '@/components/MarketingHeader.vue'
import MarketingFooter from '@/components/MarketingFooter.vue'
</script>

<template>
  <main class="flex min-h-screen w-full flex-col items-center justify-center space-y-6 p-4 md:p-8">
    <MarketingHeader class="mx-auto w-full max-w-4xl" />
    <div class="mx-auto flex w-full max-w-4xl flex-1 flex-col items-start justify-center">
      <router-view></router-view>
    </div>
    <MarketingFooter class="mx-auto w-full max-w-4xl" />
  </main>
</template>