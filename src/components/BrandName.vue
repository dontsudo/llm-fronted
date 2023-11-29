<script setup lang="ts">
import { RouterLink } from "vue-router";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuContent,
} from "@/components/ui/context-menu";
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <RouterLink to="/" className="font-cal text-muted-foreground hover:text-foreground">
        Ghostform
      </RouterLink>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem asChild>
        <a href="/assets/logos/logo.svg">Download SVG</a>
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>