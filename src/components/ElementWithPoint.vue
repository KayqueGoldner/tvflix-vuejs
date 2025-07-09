<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  className?: string;
  lastItem?: boolean;
}>();

const baseClass = computed(() => {
  return [
    "relative",
    !props.lastItem &&
      "pr-4 mr-2 sm:mr-4 after:absolute after:-right-[0px] after:sm:-right-[3px] after:top-1/2 after:-translate-y-1/2 after:w-[6px] after:h-[6px] after:bg-slate-300 after:rounded-full",
    props.className,
  ];
});
</script>

<template>
  <div :class="baseClass">
    <slot />
  </div>
</template>
