<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Button } from '@/components/ui/button'
import LoadingAnimation from '@/components/LoadingAnimation.vue';
import { runAllTasks } from '@/services/task';
import { Project } from '@/types';
import { toast } from './ui/toast';

const props = defineProps<{
  project: Project
}>()

const queryClient = useQueryClient()

const { mutate: runAllMutate, isPending: isRunAllPending } = useMutation({
  mutationFn: runAllTasks,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['projects', { id: props.project.id }],
    });
    toast({
      description: '모든 작업이 실행되었습니다.',
    })
  },
  onError: (error) => {
    toast({
      description: error.message,
      variant: 'destructive'
    })
  },
})

const handleAllRunTask = () => {
  runAllMutate({
    projectId: String(props.project.id),
  });
};


</script>

<template>
  <Button :disabled="isRunAllPending" @click="handleAllRunTask">
    <template v-if="isRunAllPending">
      <LoadingAnimation />
    </template>
    <template v-else>
      전체 실행
    </template>
  </Button>
</template>