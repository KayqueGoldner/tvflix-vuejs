<script lang="ts" setup>
import SearchModal from "@/components/SearchModal.vue";
</script>

<template>
  <header
    class="bg-slate-950 h-16 px-4 flex items-center justify-between shrink-0"
  >
    <a href="/">
      <img src="/logo.png" width="120" height="64" />
    </a>

    <SearchModal />
  </header>
</template>
