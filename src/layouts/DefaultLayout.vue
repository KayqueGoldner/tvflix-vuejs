<script setup lang="ts">
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="h-screen flex flex-col">
    <Header />
    
    <main class="flex-1 bg-slate-900 overflow-hidden">
      <div class="flex size-full">
        <Sidebar />
        <router-view />
      </div>
    </main>
  </div>
</template>
