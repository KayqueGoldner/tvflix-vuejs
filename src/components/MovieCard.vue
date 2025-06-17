<template>
  <div
    class="bg-white rounded shadow overflow-hidden hover:scale-[1.02] transition"
  >
    <img
      v-if="poster"
      :src="`https://image.tmdb.org/t/p/w500${poster}`"
      :alt="title"
      class="w-full h-auto"
    />
    <div class="p-2">
      <h2 class="text-lg font-semibold truncate">{{ title }}</h2>
      <p class="text-sm text-gray-600 line-clamp-2">{{ overview }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  overview: string;
  poster: string | null;
}>();
</script>
