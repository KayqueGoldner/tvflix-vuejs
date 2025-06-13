<template>
  <div class="p-4 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-4">Buscar Filmes</h1>

    <div class="flex gap-2 mb-6">
      <input
        v-model="query"
        @keydown.enter="searchMovies"
        type="text"
        placeholder="Digite o nome do filme..."
        class="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="searchMovies"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Buscar
      </button>
    </div>

    <div v-if="movies.length === 0 && query">
      <p>Nenhum filme encontrado para "{{ query }}".</p>
    </div>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="bg-white rounded shadow overflow-hidden"
      >
        <img
          v-if="movie.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          class="w-full h-auto"
        />
        <div class="p-2">
          <h2 class="text-lg font-semibold truncate">{{ movie.title }}</h2>
          <p class="text-sm text-gray-600 line-clamp-2">{{ movie.overview }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "../services/api";

const query = ref("");
const movies = ref<any[]>([]);

const searchMovies = async () => {
  if (!query.value) return;

  try {
    const res = await api.get("/search/movie", {
      params: { query: query.value },
    });
    movies.value = res.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
  }
};
</script>
