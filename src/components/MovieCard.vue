<template>
  <router-link :to="`/filme/${id}`" class="group">
    <div
      class="relative w-full aspect-[2/3] rounded-md overflow-hidden bg-neutral-950"
    >
      <img
        v-if="poster"
        :src="`https://image.tmdb.org/t/p/w500${poster}`"
        :alt="title"
        class="size-full object-cover"
      />
      <FilmIcon
        v-else
        class="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 text-destructive size-14"
      />
      <div
        class="absolute inset-0 group-hover:opacity-100 opacity-0 pointer-events-none bg-destructive/20 transition"
      ></div>
    </div>
    <div class="py-2">
      <h1 class="truncate text-xl font-semibold text-white">{{ title }}</h1>
      <div class="flex justify-between items-center py-2">
        <div class="flex items-center gap-x-1">
          <StarIcon class="size-4 text-white fill-white" />
          <p class="font-medium text-white">{{ popularity.toFixed(1) }}</p>
        </div>
        <div class="flex items-center gap-x-1">
          <div
            class="inline-flex items-center border py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]"
          >
            <span class="font-medium text-sm capitalize">{{ type }}</span>
          </div>
          <div
            class="inline-flex items-center border py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent px-2 bg-zinc-600/40 hover:bg-zinc-600/20 text-white rounded-[6px]"
          >
            <span class="font-medium text-sm">{{ year ? year : "?" }}</span>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { FilmIcon, StarIcon } from "lucide-vue-next";

defineProps<{
  id: number;
  title: string;
  poster: string | null;
  popularity: number;
  type: string;
  year: string;
}>();
</script>
