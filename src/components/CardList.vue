<script setup lang="ts">
import { ref } from "vue";

import type { ItvWithMovie } from "@/types";
import api from "@/services/api";

import ScrollbarSlide from "./slide/ScrollbarSlider.vue";
import MovieCard from "./MovieCard.vue";

interface MoviesListProps {
  url: string;
  title: string;
  className?: string;
  contentType: "movie" | "tv";
}

const props = defineProps<MoviesListProps>();

const results = ref<ItvWithMovie[]>([]);
const isLoading = ref(false);
const error = ref("");

try {
  isLoading.value = true;
  error.value = "";

  const response = await api.get(props.url, {
    params: { page: 1, include_adult: false },
  });

  results.value = response.data.results;
} catch (err) {
  error.value = "Erro ao buscar dados.";
  console.error(err);
} finally {
  isLoading.value = false;
}
</script>

<template>
  <div v-if="results.length > 0" :class="['mb-7', className]">
    <ScrollbarSlide :title="title">
      <MovieCard
        v-if="contentType === 'movie'"
        v-for="movie in results"
        :key="movie.id"
        :href="`/filme/${movie.id}`"
        :id="movie.id!"
        :title="movie.title!"
        :poster="movie.poster_path!"
        :popularity="movie.vote_average!"
        :year="movie.release_date?.slice(0, 4)!"
        card-class="w-[200px]"
      />
      <MovieCard
        v-if="contentType === 'tv'"
        v-for="tv in results"
        :key="tv.id"
        :href="`/tv/${tv.id}`"
        :id="tv.id!"
        :title="tv.name!"
        :poster="tv.poster_path!"
        :popularity="tv.vote_average!"
        :year="tv.first_air_date?.slice(0, 4)!"
        card-class="w-[200px]"
      />
    </ScrollbarSlide>
  </div>
</template>
