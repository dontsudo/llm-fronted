<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import { getProject, } from '@/services/project';
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import TaskCreateButton from '@/components/TaskCreateButton.vue';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { Task } from '@/types';
import TaskFileUploadButton from '@/components/TaskFileUploadButton.vue';
import TaskFileDownloadButton from '@/components/TaskFileDownloadButton.vue';
import TaskActions from '@/components/TaskActions.vue';
import TaskRunAllButton from '@/components/TaskRunAllButton.vue';

const route = useRoute();
const pollingInterval = 5000; // adjust as needed

const { data, isLoading, refetch } = useQuery({
  queryKey: ['projects', { id: route.params.id }],
  queryFn: () => getProject(route.params.id as string),
});

const checkTaskStatus = () => {
  refetch();
};

onMounted(() => {
  const pollIntervalId = setInterval(checkTaskStatus, pollingInterval);
  onBeforeUnmount(() => {
    clearInterval(pollIntervalId);
  });
});

// New code for handling row click and sheet visibility
const selectedTask = ref<Task | null>(null);

const handleRowClick = (task: Task) => {
  selectedTask.value = task;
};

</script>

<template>
  <div v-if="isLoading">
    Loading...
  </div>
  <div v-else-if="data">
    <div class="flex justify-between mb-2">
      <div class="flex justify-start gap-2">
        <TaskFileUploadButton :project="data" />
        <TaskFileDownloadButton :project="data" />
      </div>
      <div class="flex justify-end gap-1">
        <TaskCreateButton :project="data" />
        <TaskRunAllButton :project="data" />
      </div>
    </div>
    <Sheet>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-2 py-3">
                작업 ID
              </th>
              <th scope="col" class="px-2 py-3">
                상태
              </th>
              <template v-for="key in data.variables" :key="key">
                <th scope="col" class="px-2 py-3">
                  {{ key }}
                </th>
              </template>
              <th scope="col" class="px-2 py-3">
                작업
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b" v-for="task in data.tasks" :key="task.id" @click="handleRowClick(task)">
              <th scope="row" class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ task.id }}
              </th>
              <td class="px-2 py-4 whitespace-nowrap">
                <Badge variant="outline">
                  {{ task.status }}
                </Badge>
              </td>
              <template v-for="header in data.variables" :key="header">
                <td class="px-2 py-4 truncate">
                  {{ task.variables[header] || '-' }}
                </td>
              </template>
              <td class="text-center align-middle space-x-1">
                <TaskActions :task="task" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <SheetContent v-if="selectedTask" class="overflow-y-auto text-sm space-y-2 w-[400px] sm:w-[740px]">
        <SheetHeader>
          <SheetTitle>상세보기</SheetTitle>
        </SheetHeader>
        <!-- update fields logic -->
        <div class="flex flex-col space-y-4">
          <div v-for="(value, key) in selectedTask.variables" :key="key">
            <Label :for="key">{{ key }}</Label>
            <div class="px-4 py-2 bg-gray-100 rounded-md">
              {{ value }}
            </div>
          </div>
          <!-- Display task result -->
          <div>
            <Label for="result">결과</Label>
            <div class="px-4 py-2 bg-gray-100 rounded-md whitespace-pre-wrap">
              {{ selectedTask.result }}
            </div>
          </div>
        </div>
        <SheetFooter>
          <!-- <SheetClose as-child>
            <Button type="submit">
              Save changes
            </Button>
          </SheetClose> -->
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>