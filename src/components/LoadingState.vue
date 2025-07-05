<script setup lang="ts">
import { Loader2Icon } from "lucide-vue-next";

withDefaults(defineProps<{ isLoading: boolean }>(), {
  isLoading: false,
});
</script>

<template>
  <div
    v-if="isLoading"
    class="size-full flex justify-center items-center overflow-hidden"
  >
    <div>
      <Loader2Icon class="size-10 animate-spin text-white" />
    </div>
  </div>
</template>
