<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SheetTrigger } from '@/components/ui/sheet';
import { toast } from '@/components/ui/toast';
import { Task } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { runSingleTask, deleteTask } from '@/services/task';

const props = defineProps<{
  task: Task;
}>()


const queryClient = useQueryClient()

const { mutate: runMutate, isPending: isRunPending } = useMutation({
  mutationFn: runSingleTask,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['projects', { id: props.task.projectId }],
    });
    toast({
      description: '작업이 실행되었습니다.',
    })
  },
  onError: (error) => {
    toast({
      description: error.message,
      variant: 'destructive'
    })
  },
});

const handleSingRunTask = (id: string) => {
  runMutate({
    projectId: props.task.projectId,
    taskId: id,
  });
};

const { mutate: deleteMutate, isPending: isDeletePending } = useMutation({
  mutationFn: deleteTask,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['projects', { id: props.task.projectId }],
    });
    toast({
      description: '작업이 삭제되었습니다.',
    })
  },
  onError: (error) => {
    toast({
      description: error.message,
      variant: 'destructive'
    })
  },
})

const handleDelete = () => {
  deleteMutate({
    projectId: props.task.projectId,
    taskId: props.task.id,
  });
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <MoreHorizontal class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <SheetTrigger as-child>
        <DropdownMenuItem>
          보기
        </DropdownMenuItem>
      </SheetTrigger>
      <DropdownMenuItem :disabled="isRunPending" @click.stop="() => handleSingRunTask(task.id)">
        <template v-if="isRunPending">
          <LoadingAnimation />
        </template>
        <template v-else>
          실행
        </template>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem :disabled="isDeletePending" @click="handleDelete">
        삭제
        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>