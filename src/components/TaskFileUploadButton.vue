<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { uploadTaskByFile } from '@/services/task';
import { Project } from '@/types';

const props = defineProps<{
  project: Project
}>()

const queryClient = useQueryClient()
const { mutateAsync, isPending } = useMutation({
  mutationFn: uploadTaskByFile,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['projects', { id: props.project.id }],
    });
    toast({
      description: '작업이 업로드 되었습니다.',
    })
  },
  onError: (error) => {
    toast({
      description: error.message,
      variant: 'destructive'
    })
  },
})

const fileInput: Ref<HTMLInputElement | null> = ref(null);

const selectFile = (): void => {
  fileInput.value?.click();
};

const onFileChange = async (e: Event): Promise<void> => {
  const target = e.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;

  if (!file) return;

  await mutateAsync({
    projectId: props.project.id,
    file,
  });
};
</script>

<template>
  <div>
    <Button variant="outline" :disabled="isPending" @click="selectFile">파일 업로드</Button>
    <input type="file" ref="fileInput" @change="onFileChange" style="display: none;" />
  </div>
</template>