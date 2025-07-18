<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watchEffect } from "vue";
import api from "../services/api";
import MovieCard from "../components/MovieCard.vue";

const route = useRoute();

const movies = ref<any[]>([]);
const isLoading = ref(false);
const error = ref("");

const query = route.query.query as string;
const page = (route.query.page as string) || "1";

const fetchMovies = async () => {
  if (!query) return;
  isLoading.value = true;
  error.value = "";
  try {
    const res = await api.get("/search/movie", {
      params: {
        query,
        page,
        include_adult: route.query.include_adult || "false",
      },
    });
    movies.value = res.data.results;
  } catch (err) {
    error.value = "Erro ao buscar filmes.";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

watchEffect(() => {
  fetchMovies();
});
</script>

<template>
  <div class="p-4 max-w-6xl mx-auto overflow-y-auto">
    <h1 class="text-5xl font-bold mb-6 text-white">
      Resultados para "{{ query }}"
    </h1>

    <div v-if="isLoading">Carregando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="movies.length === 0">Nenhum resultado encontrado.</div>

    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xs:gap-5 w-full pt-5"
    >
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :id="movie.id"
        :title="movie.title"
        :poster="movie.poster_path"
        :popularity="movie.popularity"
        :year="movie.release_date.slice(0, 4)"
        type="Filme"
      />
    </div>
  </div>
</template>
