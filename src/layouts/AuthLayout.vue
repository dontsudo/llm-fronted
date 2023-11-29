<script setup lang="ts">
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { RouterView, useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
  <div
    class="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <a v-if="route.path === '/auth/sign-up'" href="/auth/sign-in" :class="cn(
      buttonVariants({ variant: 'ghost' }),
      'absolute right-4 top-4 md:right-8 md:top-8',
    )">
      Login
    </a>
    <a v-else href="/auth/sign-up" :class="cn(
      buttonVariants({ variant: 'ghost' }),
      'absolute right-4 top-4 md:right-8 md:top-8',
    )">
      Sign Up
    </a>
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center text-lg font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" class="mr-2 h-6 w-6">
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        Ghostform
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            &ldquo;This library has saved me countless hours of work and
            helped me deliver stunning designs to my clients faster than
            ever before.&rdquo;
          </p>
          <footer class="text-sm">
            Sofia Davis
          </footer>
        </blockquote>
      </div>
    </div>
    <div class="lg:p-8">
      <RouterView></RouterView>
    </div>
  </div>
</template>