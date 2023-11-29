<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import { signOut } from '@/services/auth';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import LoadingAnimation from '@/components/LoadingAnimation.vue';

const router = useRouter()

const { mutate, isPending } = useMutation({
  mutationFn: signOut,
  onSuccess: () => {
    router.push('/');
  },
  onError: (error) => {
    toast({
      description: error.message,
      variant: 'destructive'
    })
  },
})
</script>

<template>
  <Button variant="destructive" :disabled="isPending" @click="mutate">
    <template v-if="isPending">
      <LoadingAnimation />
    </template>
    <template v-else>
      Sign Out
    </template>
  </Button>
</template>