<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watchEffect } from "vue";

const scrollContainer = ref<HTMLElement | null>(null);

import api from "../services/api";
import type { Itv } from "../types";
import MovieCard from "../components/MovieCard.vue";
import Pagination from "../components/Pagination.vue";
import LoadingState from "../components/LoadingState.vue";

const route = useRoute();

const movies = ref<{
  total_pages: number;
  results: Itv[];
}>({
  total_pages: 0,
  results: [],
});
const isLoading = ref(false);
const error = ref("");

const fetchMovies = async (page: number, includeAdult: boolean) => {
  isLoading.value = true;
  error.value = "";

  try {
    const res = await api.get("/discover/tv", {
      params: {
        page: page > 500 ? 500 : page,
        include_adult: includeAdult,
      },
    });
    movies.value = res.data;
  } catch (err) {
    error.value = "Erro ao buscar programas de TV.";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

watchEffect(() => {
  const page = route.query.page ? Number(route.query.page) : 1;
  const includeAdult = Boolean(route.query.include_adult) || false;

  fetchMovies(page, includeAdult).then(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
});
</script>

<template>
  <div ref="scrollContainer" class="p-4 max-w-6xl mx-auto overflow-y-auto">
    <h1 v-if="movies.results.length" class="text-5xl font-bold mb-6 text-white">
      Programas de TV
    </h1>

    <LoadingState :isLoading="isLoading" />

    <div
      v-if="movies.results.length"
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xs:gap-5 w-full pt-5"
    >
      <MovieCard
        v-for="tv in movies.results"
        :key="tv.id"
        :href="`/tv/${tv.id}`"
        :id="tv.id"
        :title="tv.name"
        :poster="tv.poster_path"
        :popularity="tv.vote_average"
        :year="tv.first_air_date.slice(0, 4)"
      />
    </div>

    <Pagination
      v-if="movies.total_pages"
      :maxPages="movies.total_pages"
      :isLoading="isLoading"
    />
  </div>
</template>
