<script setup lang="ts">
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="h-screen flex flex-col">
    <Header />

<<<<<<< Updated upstream
    <main class="flex-1 overflow-y-auto">
      <router-view />
=======
    <main class="flex-1 bg-slate-900 overflow-hidden">
      <div class="flex size-full">
        <Sidebar />
        <router-view />
      </div>
>>>>>>> Stashed changes
    </main>
  </div>
</template>
