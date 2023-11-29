<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getAllPublicProjects } from '@/services/community';
import Header from '@/components/Header.vue';
import CommunityProjectCard from '@/components/CommunityProjectCard.vue';

const { data, isLoading } = useQuery({
  queryKey: ['community'],
  queryFn: getAllPublicProjects
})
</script>

<template>
  <div class="h-full space-y-6">
    <Header title="커뮤니티" description="프로젝트를 공유하고, 다른 사람들의 프로젝트를 보세요." />
    <div v-if="isLoading">Loading...
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="project in data" :key="project.id">
        <CommunityProjectCard :project="project" />
      </div>
    </div>
  </div>
</template>
