<script setup lang="ts">
import { useQueryClient, useMutation } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import LoadingAnimation from '@/components/LoadingAnimation.vue'
import { createProject } from '@/services/project'

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(1000),
}))

const form = useForm({
  validationSchema: formSchema,
})

const queryClient = useQueryClient()
const { isPending, mutateAsync } = useMutation({
  mutationFn: createProject,
  onSuccess: () => {
    console.log('create success')
    queryClient.invalidateQueries({
      queryKey: ['projects']
    })
    toast({ title: "프로젝트가 생성되었습니다." })
  },
  onError: () => {
    toast({
      title: "프로젝트 생성에 실패했습니다.",
      variant: "destructive",
    })
  },
})

const onSubmit = form.handleSubmit(async (values) => {
  await mutateAsync(values)
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>Create</Button>
    </DialogTrigger>
    <DialogContent>
      <form class="space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>이름</FormLabel>
            <FormControl>
              <Input type="text" placeholder="블로그 글 쓰기" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>설명</FormLabel>
            <FormControl>
              <Input type="text" placeholder="키워드로 블로그 글을 작성해보세요." v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <DialogFooter class="flex-row justify-end gap-2 pt-4">
          <DialogClose as-child>
            <Button :disabled="isPending || !form.errors" class="mt-4" type="submit">
              <template v-if="isPending">
                <LoadingAnimation />
              </template>
              <template v-else>
                Create
              </template>
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>