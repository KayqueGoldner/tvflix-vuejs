<script setup lang="ts">
import { ref } from "vue";

import type { Igenres, ItvWithMovie } from "../types";
import BannerSlide from "./slide/BannerSlider.vue";
import api from "../services/api";

const props = defineProps<{
  url: string;
  contentType: "tv" | "movie";
}>();

const genres = ref<Igenres[]>([]);
const movies = ref<ItvWithMovie[]>([]);
const isLoading = ref(false);
const error = ref("");

try {
  isLoading.value = true;
  error.value = "";

  const [resGenres, resMovies] = await Promise.all([
    api.get(`/genre/${props.contentType}/list`, {
      params: { page: 1, include_adult: false },
    }),
    api.get(props.url, {
      params: { page: 1, include_adult: false },
    }),
  ]);

  genres.value = resGenres.data.genres;
  movies.value = resMovies.data.results;
} catch (err) {
  error.value = "Erro ao buscar dados.";
  console.error(err);
} finally {
  isLoading.value = false;
}
</script>

<template>
  <BannerSlide :data="movies" :genres="genres" />
</template>
