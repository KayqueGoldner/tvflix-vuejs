<script setup lang="ts">
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="h-screen bg-slate-900">
    <div class="flex flex-col size-full max-w-[1440px] mx-auto">
      <Header />

      <main class="flex-1 overflow-hidden">
        <div class="flex size-full">
          <Sidebar />
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>
