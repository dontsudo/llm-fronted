<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import { getProject } from '@/services/project';
import ProjectDeleteButton from '@/components/ProjectDeleteButton.vue';

const route = useRoute()

const { data: project, isPending } = useQuery({
  queryKey: ['projects', { id: route.params.id }],
  queryFn: () => getProject(route.params.id as string)
})
</script>

<template>
  <div v-if="isPending">Loading...</div>
  <div v-else-if="project">
    <ProjectDeleteButton :project="project" />
  </div>
</template>