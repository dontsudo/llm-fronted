<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import { getProject } from '@/services/project';
import ProjectTabs from '@/components/ProjectTabs.vue';
import ProjectVisibilitySwitch from '@/components/ProjectVisibilitySwitch.vue';
import Header from '@/components/Header.vue';

const route = useRoute()

const { data: project, isPending } = useQuery({
  queryKey: ['projects', { id: route.params.id }],
  queryFn: () => getProject(route.params.id as string)
})
</script>

<template>
  <div v-if="isPending">Loading...</div>
  <div v-else-if="project" class="flex flex-col h-full space-y-6">
    <div class="flex items-center justify-between">
      <Header :title="project.name" :description="project.description" />
      <div class="flex items-center gap-2">
        <ProjectVisibilitySwitch :project="project" />
      </div>
    </div>
    <ProjectTabs />
    <router-view></router-view>
  </div>
  <div v-else>Not found</div>
</template>