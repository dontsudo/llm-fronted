<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Project } from '@/types';
import { BASE_URL } from '@/services/shared';

const props = defineProps<{
  project: Project
}>()

const handleDownload = async () => {
  window.open(`${BASE_URL}/projects/${props.project.id}/tasks/download-file`)
  // try {
  //   downloadTaskByFile({
  //     projectId: props.project.id,
  //   })
  // } catch (error) {
  //   console.error(error)
  //   toast({
  //     description: '파일 다운로드에 실패했습니다.',
  //     variant: 'destructive'
  //   })
  // }
}
</script>

<template>
  <Button variant="outline" @click="handleDownload">파일 다운로드</Button>
</template>