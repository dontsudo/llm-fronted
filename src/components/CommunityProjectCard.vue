<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog'
import { Project } from '@/types';
import { StarIcon } from 'lucide-vue-next';
import { EyeIcon } from 'lucide-vue-next'
import CommunityPromptForm from './CommunityPromptForm.vue';

defineProps<{
  project: Project
}>()
</script>

<template>
  <Dialog>
    <DialogTrigger as="div">
      <Card
        class="transition duration-200 ease-in-out hover:bg-slate-50 hover:shadow-lg h-[220px] flex flex-col justify-between">
        <CardHeader class="grid items-start gap-4 space-y-0">
          <div class="space-y-1">
            <CardTitle>{{ project.name }}</CardTitle>
            <CardDescription>{{ project.description }}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex justify-between space-x-4 text-sm text-muted-foreground">
            <div class="flex gap-2">
              <div class="flex items-center">
                <EyeIcon class="mr-1 h-3 w-3" />
                23
              </div>
              <div class="flex items-center">
                <StarIcon class="mr-1 h-3 w-3" />
                20k
              </div>
            </div>
            <div>Updated {{ formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true }) }}</div>
          </div>
        </CardContent>
      </Card>
    </DialogTrigger>
    <DialogContent class="max-w-2xl sm:min-w-[80vw] sm:min-h-[80vh]">
      <DialogHeader>
        <DialogTitle>{{ project.name }}</DialogTitle>
        <DialogDescription class=" space-y-2">
          {{ project.description }}
        </DialogDescription>
        <CommunityPromptForm :project="project" />
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>