<script setup lang="ts">
import { Suspense } from "vue";
import { defineAsyncComponent } from "vue";

const HomeBanner = defineAsyncComponent(
  () => import("@/components/HomeBanner.vue")
);
const CardList = defineAsyncComponent(
  () => import("@/components/CardList.vue")
);

const moviesListUrls = [
  {
    name: "Filmes Mais Bem Avaliados",
    url: "/movie/top_rated",
  },
  {
    name: "Filmes Populares",
    url: "/movie/popular",
  },
  {
    name: "Próximos Filmes",
    url: "/movie/upcoming",
  },
];
const tvListUrls = [
  {
    name: "Programas De TV Mais Bem Avaliados",
    url: "/tv/top_rated",
  },
  {
    name: "Programas De TV Populares",
    url: "/tv/popular",
  },
  {
    name: "Próximos Programas De TV",
    url: "/tv/on_the_air",
  },
];
</script>

<template>
  <div className="py-3 px-4 pb-5 space-y-5 overflow-y-auto bg-surface">
    <Suspense>
      <template #default>
        <HomeBanner url="/movie/now_playing" contentType="movie" />
      </template>
      <template #fallback>
        <div className="h-[480px] w-full bg-outline animate-pulse" />
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <CardList
          v-for="item in moviesListUrls"
          :key="item.name"
          :url="item.url"
          :title="item.name"
          contentType="movie"
        />
      </template>
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <HomeBanner url="/tv/airing_today" contentType="tv" />
      </template>
      <template #fallback>
        <div className="h-[480px] w-full bg-outline animate-pulse" />
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <CardList
          v-for="item in tvListUrls"
          :key="item.name"
          :url="item.url"
          :title="item.name"
          contentType="tv"
        />
      </template>
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </div>
</template>
