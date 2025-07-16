<template>
  <button
    class="w-max h-max p-2 bg-slate-950 hover:bg-destructive disabled:opacity-50 disabled:pointer-events-none rounded-[6px] transition ease-out duration-150"
    v-bind="$attrs"
  >
    <ArrowLeft class="h-4 w-4 text-white" />
  </button>
</template>

<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";
</script>
