<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import ElementWithPoint from "./ElementWithPoint.vue";
import type { Igenres } from "../types/index";

const props = defineProps<{
  genres: Igenres[] | null;
  contentType: "tv" | "filmes";
  className?: string;
}>();

const router = useRouter();

const topGenres = computed(() => props.genres?.slice(0, 3) || []);

const goToGenre = (id: number) => {
  router.push(`/navegar/${props.contentType}?with_genres=${id}`);
};
</script>

<template>
  <div :class="['flex flex-wrap mt-3 gap-y-3', className]">
    <template v-if="!genres">
      <ElementWithPoint v-for="i in 3" :key="i" :lastItem="i === 3">
        <div
          class="animate-pulse h-7 w-16 bg-white/10 hover:bg-white/20 rounded-full transition"
        />
      </ElementWithPoint>
    </template>

    <template v-else>
      <ElementWithPoint
        v-for="(item, index) in topGenres"
        :key="item.id"
        :lastItem="index >= topGenres.length - 1"
      >
        <button
          class="text-white text-sm sm:text-base py-1 font-medium h-max bg-white/10 hover:bg-white/20 px-2 sm:px-3 rounded-full border border-white/20 transition"
          @click="goToGenre(item.id)"
        >
          {{ item.name }}
        </button>
      </ElementWithPoint>
    </template>
  </div>
</template>
