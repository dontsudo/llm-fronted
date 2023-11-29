<script setup lang="ts">
import { Pencil, Settings, Table } from 'lucide-vue-next';
import { useRoute } from 'vue-router';

const route = useRoute()

const tabs = [
  { name: '프롬프트', path: `/app/projects/${route.params.id}/prompt`, icon: Pencil },
  { name: '테이블', path: `/app/projects/${route.params.id}/table`, icon: Table },
  { name: '설정', path: `/app/projects/${route.params.id}/setting`, icon: Settings },
];
</script>

<template>
  <div class="border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <li class="me-2" v-for="(tab, index) in tabs" :key="index">
        <router-link :to="`${tab.path}`"
          class="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
          active-class="text-slate-600 border-slate-600 dark:text-slate-500 dark:border-slate-500">
          <!-- Use the component tag with :is to dynamically render the icon -->
          <component :is="tab.icon"
            class="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" />
          {{ tab.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
