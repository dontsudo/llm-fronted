<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { generateProjectAnswer } from '@/services/project';
import { toast } from '@/components/ui/toast';
import LoadingAnimation from '@/components/LoadingAnimation.vue';
import { Project } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { forkPublicProject } from '@/services/community';

const props = defineProps<{
  project: Project
}>()

const route = useRoute()
const router = useRouter()

const answer = ref('');
const vars = reactive<Record<string, string>>(props.project.variables.reduce((acc, cur) => {
  acc[cur] = ''
  return acc
}, {} as Record<string, string>));

const queryClient = useQueryClient()
const isGenerateLoading = ref(false);

const handleGenerate = async () => {
  try {
    isGenerateLoading.value = true
    answer.value = ''

    let newPrompt = props.project.prompt || ''
    for (const [key, value] of Object.entries(vars))
      newPrompt = newPrompt.replace(`[${key}]`, value)

    for await (const chunk of generateProjectAnswer({
      id: route.params.id as string, content: newPrompt
    }))
      answer.value += chunk
  } catch (error) {
    toast({
      title: '생성에 실패했습니다.',
      variant: 'destructive'
    })
  } finally {
    isGenerateLoading.value = false
    queryClient.invalidateQueries({
      queryKey: ['projects', { id: props.project.id }],
    });
  }
}

const { mutate: forkMutate, isPending: isForkPending } = useMutation({
  mutationFn: forkPublicProject,
  onSuccess: (forkedProject) => {
    toast({
      description: '프로젝트를 성공적으로 포크했습니다.',
    })
    console.log('forkedProject', forkedProject)
    // router.push(`/app/projects/${forkedProject.id}`)
  },
  onError: () => {
    toast({
      title: '포크에 실패했습니다.',
      variant: 'destructive'
    })
  }
})
</script>

<template>
  <div v-if="project" class="h-full grid items-stretch gap-6 md:grid-cols-[1fr_300px]">
    <div class="hidden flex-col space-y-4 sm:flex md:order-2">
      <div class="grid gap-2">
        <HoverCard :open-delay="200">
          <HoverCardTrigger as-child>
            <span class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              변수 & 설정
            </span>
          </HoverCardTrigger>
          <HoverCardContent class="w-[300px] text-sm" side="left">
            변수와 설정을 변경할 수 있습니다.
          </HoverCardContent>
          <div v-for="(_, key) in vars" :key="key" class="mt-2">
            <Label :for="`variable-${key}`">{{ key }}</Label>
            <Textarea v-model="vars[key]" :id="`variable-${key}`" />
          </div>
        </HoverCard>
      </div>
    </div>
    <div class="flex flex-1 flex-col md:order-1">
      <div class="flex flex-1 flex-col space-y-6 border-0 pb-6">
        <div class="grid h-full gap-6 lg:grid-cols-2">
          <div class="flex flex-1 flex-col space-y-4">
            <div class="flex flex-1 flex-col space-y-2">
              <Label for="input">입력</Label>
              <Textarea v-model="project.prompt" readonly id="input" class="flex-1 h-full" />
            </div>
            <div class="flex flex-col space-y-2">
              <Label for="instructions">지시문</Label>
              <Textarea id="instructions" placeholder="Fix the grammar." class="flex-1 h-full" />
            </div>
          </div>
          <div class="flex flex-1 flex-col space-y-2">
            <Label for="output">답변</Label>
            <Textarea v-model="answer" readonly class="mt-[21px] flex-1 h-full rounded-md border bg-muted" />
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <Button :disabled="isGenerateLoading" @click="handleGenerate">
            <template v-if="isGenerateLoading">
              <LoadingAnimation />
            </template>
            <template v-else>
              생성
            </template>
          </Button>
          <Button variant="secondary" :disabled="isForkPending" @click="forkMutate(project.id)">
            <template v-if="isForkPending">
              <LoadingAnimation />
            </template>
            <template v-else>
              포크
            </template>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>