<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns';
import { useQuery } from '@tanstack/vue-query';
import { getProjects } from '@/services/project';
import Header from '@/components/Header.vue';
import ProjectCreateButton from '@/components/ProjectCreateButton.vue';

const { data, isLoading } = useQuery({
  queryKey: ['projects'],
  queryFn: getProjects
})

</script>

<template>
  <div className="grid min-h-full grid-cols-1 grid-rows-[auto,1fr,auto] gap-6 md:grid-cols-2 md:gap-8">
    <Header title="프로젝트" description="여러분의 프로젝트를 관리하세요.">
      <template #actions>
        <ProjectCreateButton />
      </template>
    </Header>
    <div v-if="isLoading">
      Loading..
    </div>
    <div v-else class="col-span-full">
      <table class="w-full border-border text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              이름
            </th>
            <th scope="col" class="px-6 py-3">
              설명
            </th>
            <th scope="col" class="relative px-6 py-3">
              최근 업데이트
            </th>
            <th scope="col" class="px-6 py-3">
              상세
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(item, index) in data" :key="index">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ item.name }}
            </th>
            <td class="px-6 py-4">
              {{ item.description }}
            </td>
            <!-- Add more <td> elements here for other properties -->
            <td class="px-6 py-4">
              {{ formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true }) }}
            </td>
            <td class="px-6 py-4">
              <router-link :to="`/app/projects/${item.id}/prompt`" class="font-medium hover:underline">
                자세히보기
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>