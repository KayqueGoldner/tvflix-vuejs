<template>
  <router-link :to="href" class="group">
    <div
      class="relative w-full aspect-[2/3] rounded-md overflow-hidden bg-neutral-950"
    >
      <img
        v-if="image"
        :src="`https://image.tmdb.org/t/p/w500${image}`"
        :alt="name"
        class="size-full object-cover"
      />
      <UserIcon
        v-else
        class="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 text-destructive size-14"
      />
      <div
        class="absolute inset-0 group-hover:opacity-100 opacity-0 pointer-events-none bg-destructive/20 transition"
      ></div>
    </div>
    <div class="py-2">
      <h1 class="truncate text-xl font-semibold text-white">{{ name }}</h1>
      <div class="flex justify-between items-center py-2">
        <div class="flex items-center gap-x-1">
          <StarIcon class="size-4 text-white fill-white" />
          <p class="font-medium text-white">{{ popularity.toFixed(1) }}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { StarIcon, UserIcon } from "lucide-vue-next";

defineProps<{
  href: string;
  id: number;
  name: string;
  image: string | null;
  popularity: number;
}>();
</script>
