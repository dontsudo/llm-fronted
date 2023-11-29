<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { getProject, updateProject, generateProjectAnswer } from '@/services/project';
import { toast } from '@/components/ui/toast';
import LoadingAnimation from '@/components/LoadingAnimation.vue';

const route = useRoute()
const queryClient = useQueryClient()

const { data } = useQuery({
  queryKey: ['projects', { id: route.params.id }],
  queryFn: () => getProject(route.params.id as string),
})

const updateMutation = useMutation({
  mutationFn: updateProject,
  onSuccess: data => {
    queryClient.setQueryData(['projects', { id: route.params.id }], data)
  }
})

const prompt = ref(data.value?.prompt);
const answer = ref('');
const vars = reactive<Record<string, string>>({});
const isGenerateLoading = ref(false)

initializeVariables(prompt.value || '');

watch(prompt, (newPrompt) => {
  initializeVariables(newPrompt || '');
});

// 변수 초기화 함수
function initializeVariables(newPrompt: string) {
  const newVars: Record<string, string> = {};
  const regex = /\[([^\]]+)\]/g;
  let match;

  while ((match = regex.exec(newPrompt!)) !== null) {
    const key = match[1];
    newVars[key] = vars[key] !== undefined ? vars[key] : '';
  }

  // Replace the entire vars object with the new one
  Object.keys(vars).forEach(key => delete vars[key]);
  Object.assign(vars, newVars);
}


const handleUpdate = () => {
  updateMutation.mutate({
    id: String(route.params.id),
    prompt: prompt.value,
    variables: Object.keys(vars)
  }, {
    onError: (error) => {
      console.error(error)
      toast({
        title: '프롬프트 업데이트에 실패했습니다.',
        variant: 'destructive'
      })
    },
    onSuccess: () => {
      toast({
        title: '프롬프트가 성공적으로 업데이트되었습니다.',
        variant: 'default'
      })
    }
  })
}

const handleGenerate = async () => {
  try {
    isGenerateLoading.value = true
    answer.value = ''

    let newPrompt = prompt.value || ''
    for (const [key, value] of Object.entries(vars))
      newPrompt = newPrompt.replace(`[${key}]`, value)

    for await (const chunk of generateProjectAnswer(route.params.id as string, newPrompt))
      answer.value += chunk
  } catch (error) {
    toast({
      title: '생성에 실패했습니다.',
      variant: 'destructive'
    })
  } finally {
    isGenerateLoading.value = false
  }
}
</script>

<template>
  <div v-if="data" class="h-full grid items-stretch gap-6 md:grid-cols-[1fr_300px]">
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
              <Textarea v-model="prompt" id="input" class="flex-1 h-full" />
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
          <Button @click="handleUpdate">
            <template v-if="false">
              <LoadingAnimation />
            </template>
            <template v-else>
              저장
            </template>
          </Button>
          <Button :disabled="isGenerateLoading" @click="handleGenerate">
            <template v-if="isGenerateLoading">
              <LoadingAnimation />
            </template>
            <template v-else>
              생성
            </template>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>