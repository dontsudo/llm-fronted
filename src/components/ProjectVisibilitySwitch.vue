<script setup lang="ts">
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { updateProject } from '@/services/project';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { ref } from 'vue';
import { toast } from './ui/toast';
import type { Project } from '@/types';

const props = defineProps<{
  project: Project;
}>()

const queryClient = useQueryClient();

// 프로젝트의 visibility 상태를 반응성 데이터로 관리
const projectVisibility = ref(props.project.visibility);

const { mutate } = useMutation({
  mutationFn: updateProject,
  onSuccess: (newData) => {
    projectVisibility.value = newData.visibility;
    queryClient.invalidateQueries({
      queryKey: ['projects', { id: props.project.id }]
    });
    toast({
      description: newData.visibility === 'PUBLIC'
        ? '프로젝트가 공개되었습니다.'
        : '프로젝트가 비공개되었습니다.'
    });
  },
  onError: (error) => {
    toast({
      description: error.message
    });
  }
});

const handleToggleVisibility = () => {
  mutate({
    id: props.project.id,
    visibility: projectVisibility.value === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC'
  });
}
</script>

<template>
  <div class="flex items-center space-x-2">
    <Switch id="airplane-mode" :checked="projectVisibility === 'PUBLIC'" @update:checked="handleToggleVisibility" />
    <Label for="airplane-mode">공유</Label>
  </div>
</template>
