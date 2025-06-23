<script setup lang="ts">
import { useRoute } from "vue-router";
import { cn } from "@/lib/utils";

const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
};

defineProps<{
  href: string;
  label: string;
}>();
</script>

<template>
  <div :class="cn('sidebar-item', isActive(href) && 'active')">
    <router-link
      :to="href"
      :class="
        cn(
          'relative z-10 text-lg group-hover:text-white font-medium block leading-10 w-full transition duration-300',
          isActive(href) ? 'text-white' : 'text-zinc-600'
        )
      "
    >
      {{ label }}
    </router-link>
  </div>
</template>
