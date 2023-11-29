<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signIn } from '@/services/auth' // Changed from signUp to signIn
import { useMutation } from '@tanstack/vue-query'
import { toast } from '@/components/ui/toast'
import LoadingAnimation from './LoadingAnimation.vue'

const router = useRouter()

const { mutate, isPending } = useMutation({
  mutationFn: signIn, // Changed from signUp to signIn
  onSuccess: () => {
    router.push('/app/dashboard') // You might want to redirect to a different page after sign-in
  },
  onError: () => {
    toast({
      description: 'Invalid login credentials. Please try again.',
      variant: 'destructive'
    })
  },
})

const formSchema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  mutate(values)
})

</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form class="space-y-6" @submit="onSubmit">
      <div class="grid gap-2">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel class="sr-only" for="email">
              Email
            </FormLabel>
            <FormControl>
              <Input id="email" placeholder="name@example.com" type="email" auto-capitalize="none" auto-complete="email"
                auto-correct="off" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel class="sr-only" for="password">
              Password
            </FormLabel>
            <FormControl>
              <Input id="password" placeholder="Password" type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" :disabled="isPending">
          <LoadingAnimation v-if="isPending" />
          Sign In with Email
        </Button>
      </div>
    </form>
  </div>
</template>
