<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, watchEffect } from "vue";

const scrollContainer = ref<HTMLElement | null>(null);

import api from "../services/api";
import PersonCard from "../components/PersonCard.vue";
import Pagination from "../components/Pagination.vue";
import type { Ipeople } from "../types";

const route = useRoute();

const personalities = ref<Ipeople>({
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
});
const isLoading = ref(false);
const error = ref("");

const fetchPersonalities = async (page: number) => {
  isLoading.value = true;
  error.value = "";

  try {
    const res = await api.get("/person/popular", {
      params: {
        page: page > 500 ? 500 : page,
      },
    });
    personalities.value = res.data;
  } catch (err) {
    error.value = "Erro ao buscar personalidades.";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

watchEffect(() => {
  const page = route.query.page ? Number(route.query.page) : 1;

  fetchPersonalities(page).then(() => {
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
    <h1 class="text-5xl font-bold mb-6 text-white">Personalidades</h1>

    <div
      v-if="personalities.results"
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xs:gap-5 w-full pt-5"
    >
      <PersonCard
        v-for="person in personalities.results"
        :key="person.id"
        :href="`/personalidade/${person.id}`"
        :id="person.id"
        :name="person.name"
        :image="person.profile_path"
        :popularity="person.popularity"
      />
    </div>

    <Pagination
      v-if="personalities.total_pages"
      :maxPages="personalities.total_pages"
    />
  </div>
</template>
