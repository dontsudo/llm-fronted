<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { Menu, ArrowUpRight } from 'lucide-vue-next';
import { cn } from '@/lib/utils';

const pages = []

const open = ref(false);
const route = useRoute();

watch(route, () => {
  open.value = false;
});

const setOpen = (value) => {
  open.value = value;
};

const linkClass = (page) => {
  const isActive = route.path.startsWith(page.href);
  return cn(
    "hover:bg-muted/50 hover:text-foreground text-muted-foreground group inline-flex w-full min-w-[200px] items-center rounded-md border border-transparent px-3 py-1",
    isActive && "bg-muted/50 border-border text-foreground"
  );
};

const isExternal = (href) => href.startsWith('http');

const linkAttributes = (page) => {
  return isExternal(page.href)
    ? {
      target: '_blank',
      rel: 'noopener noreferrer',
    }
    : {};
};
</script>

<template>
  <Sheet :open="open" @update:open="setOpen">
    <SheetTrigger asChild>
      <Button size="icon" variant="outline" class="rounded-full">
        <Menu class="h-6 w-6" />
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle class="ml-2 text-left">Menu</SheetTitle>
      </SheetHeader>
      <ul class="mt-4 grid gap-1">
        <li v-for="page in pages" :key="page.href" class="-ml-1 w-full">
          <RouterLink :to="page.href" :class="linkClass(page)" v-bind="linkAttributes(page)">
            {{ page.title }}
            <ArrowUpRight v-if="isExternal(page.href)" class="ml-1 h-4 w-4 flex-shrink-0" />
          </RouterLink>
        </li>
      </ul>
    </SheetContent>
  </Sheet>
</template>

