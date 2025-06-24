<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watchEffect } from "vue";
import api from "../services/api";
import MovieCard from "../components/MovieCard.vue";

const route = useRoute();

const movies = ref<any[]>([]);
const isLoading = ref(false);
const error = ref("");

const page = (route.query.page as string) || "1";

const fetchMovies = async () => {
  isLoading.value = true;
  error.value = "";
  try {
    const res = await api.get("/discover/movie", {
      params: {
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
    <h1 class="text-5xl font-bold mb-6 text-white">Filmes</h1>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xs:gap-5 w-full pt-5"
    >
      <MovieCard
        v-for="movie in movies"
        type="Filme"
        :key="movie.id"
        :id="movie.id"
        :title="movie.title"
        :poster="movie.poster_path"
        :popularity="movie.vote_average"
        :year="movie.release_date.slice(0, 4)"
      />
    </div>
  </div>
</template>
