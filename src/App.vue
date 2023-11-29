<script setup lang="ts">
import { RouterView } from 'vue-router';
import Background from '@/components/Background.vue';
import { Toaster } from '@/components/ui/toast';
</script>

<template>
  <background>
    <router-view></router-view>
  </background>
  <Toaster />
</template>


