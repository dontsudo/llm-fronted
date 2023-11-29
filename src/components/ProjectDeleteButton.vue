<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { deleteProject } from '@/services/project';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';

const router = useRouter()
const props = defineProps<{
  project: {
    id: string
  }
}>()

const queryClient = useQueryClient()
const { mutate, isPending } = useMutation({
  mutationFn: deleteProject,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['projects']
    })
    router.push('/app')
  }
})

const handleDelete = () => {
  mutate(props.project.id)
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="destructive" size="sm">
        삭제
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>정말로 프로젝트를 지우나요?</AlertDialogTitle>
        <AlertDialogDescription>
          프로젝트를 지우면 복구할 수 없습니다.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>취소</AlertDialogCancel>
        <AlertDialogAction @click="handleDelete" :disabled="isPending">계속</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>