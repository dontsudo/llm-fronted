<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { RouterLink } from 'vue-router';
import Header from '@/components/Header.vue';
</script>

<template>
  <main class="flex min-h-screen w-full flex-col space-y-6 p-4 md:p-8">
    <div class="flex flex-1 flex-col items-center justify-center gap-8">
      <div class="mx-auto max-w-xl text-center">
        <div class="flex flex-col gap-4 p-12">
          <Header title="404" description="Sorry, this page could not be found." />
          <Button variant="link" asChild>
            <RouterLink to="/app">Homepage</RouterLink>
          </Button>
        </div>
      </div>
    </div>
  </main>
</template>