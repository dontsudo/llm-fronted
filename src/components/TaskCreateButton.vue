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
import { createTask } from '@/services/task'

const props = defineProps<{
  project: {
    id: string
    variables: string[]
  }
}>()

const queryClient = useQueryClient()

const { mutate, isPending } = useMutation({
  mutationFn: createTask,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['projects', { id: props.project.id }],
    });
  },
  onError: (error) => {
    toast({
      description: error.message,
      variant: 'destructive'
    })
  },
})

// Dynamically create a schema based on the variables
const schema = props.project.variables.reduce((acc, variable) => {
  acc[variable] = z.string()
  return acc
}, {})

const typedSchema = toTypedSchema(z.object(schema))
const form = useForm({
  schema: typedSchema
})

const onSubmit = form.handleSubmit(values => {
  mutate({
    projectId: props.project.id, variables: values
  })
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline" class="flex-row items-center gap-2 font-semibold">새 작업</Button>
    </DialogTrigger>
    <DialogContent>
      <form class="space-y-6" @submit="onSubmit">
        <div v-if="props.project.variables && props.project.variables.length > 0"
          v-for="variable in props.project.variables" :key="variable">
          <FormField v-slot="{ componentField }" :name="variable">
            <FormItem>
              <FormLabel>{{ variable }}</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div v-else>
          <p>현재 변수가 없습니다. 그래도 추가하시겠습니까?</p>
        </div>
        <DialogFooter class="flex-row justify-end gap-2 pt-4">
          <DialogClose as-child>
            <Button :disabled="isPending || !form.errors" class="mt-4" type="submit">
              <template v-if="isPending">
                <LoadingAnimation />
              </template>
              <template v-else>
                추가
              </template>
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>