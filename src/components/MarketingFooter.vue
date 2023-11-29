<script setup lang="ts">
import { cn } from '@/lib/utils';
import Shell from '@/components/Shell.vue';
import FooterLink from '@/components/MarketingFooterLink.vue';

const props = defineProps<{
  class?: string
}>()

</script>

<template>
  <footer :class="cn('w-full', props.class)">
    <Shell class="grid gap-6">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <div className="order-4 md:order-1">
          <p className="text-sm text-foreground font-semibold">
            Status Widget
          </p>
        </div>
        <div className="order-1 flex flex-col gap-3 text-sm md:order-2">
          <p className="text-foreground font-semibold">Community</p>
          <FooterLink href="/github" label="GitHub" external />
          <FooterLink href="/discord" label="Discord" external />
          <FooterLink href="#" label="X" />
        </div>
        <div className="order-2 flex flex-col gap-3 text-sm md:order-3">
          <p className="text-foreground font-semibold">Resources</p>
          <FooterLink href="/blog" label="Blog" />
          <FooterLink href="/changelog" label="Changelog" />
          <FooterLink href="#" label="Docs" />
          <FooterLink href="/oss-friends" label="OSS Friends" />
        </div>
        <div className="order-3 flex flex-col gap-3 text-sm md:order-4">
          <p className="text-foreground font-semibold">Legal</p>
          <FooterLink href="/legal/terms" label="Terms" />
          <FooterLink href="/legal/privacy" label="Privacy" />
        </div>
      </div>
    </Shell>
  </footer>
</template>
