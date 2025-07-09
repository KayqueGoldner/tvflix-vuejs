<script setup lang="ts">
import { ref, watch } from "vue";
import { PlayCircleIcon } from "lucide-vue-next";
import { useRouter } from "vue-router";

import ElementWithPoint from "../ElementWithPoint.vue";
import GenresList from "../GenresList.vue";
import Button from "../ui/button/Button.vue";
import type { ItvWithMovie, Igenres } from "../../types/index";

const props = defineProps<{
  content: ItvWithMovie;
  inView: boolean;
  genres: Igenres[];
}>();

const hasLoaded = ref(false);

const title = props.content.title || props.content.name;
const releaseDate =
  props.content.release_date?.slice(0, 4) ||
  props.content.first_air_date?.slice(0, 4) ||
  "?";
const contentType = props.content.title ? "filme" : "tv";

watch(
  () => props.inView,
  (val) => {
    if (val) hasLoaded.value = true;
  }
);

const router = useRouter();

const goToDetails = () => {
  router.push(`/${contentType}/${props.content.id}`);
};
</script>

<template>
  <div class="h-[480px] w-full shadow-inner rounded-[15px] overflow-hidden">
    <div v-if="hasLoaded" class="relative w-full h-full">
      <img
        v-if="content.backdrop_path"
        :src="`https://image.tmdb.org/t/p/w1280/${content.backdrop_path}`"
        class="absolute inset-0 h-full w-full object-cover opacity-20"
        :alt="title"
        loading="lazy"
      />
      <div v-else class="absolute inset-0 h-full w-full bg-outline" />

      <div
        class="relative h-full max-w-[600px] space-y-4 lg:max-w-full pt-14 md:pt-10 pl-5 sm:pl-9 pr-6 z-10"
      >
        <div class="space-y-2">
          <h1
            class="text-white text-3xl sm:text-4xl lg:text-5xl lg:leading-tight font-bold line-clamp-2"
          >
            {{ title }}
          </h1>
          <div
            class="flex items-center"
            :class="{ 'mb-0': !content.genre_ids?.[0] }"
          >
            <ElementWithPoint>
              <h3 class="font-medium text-zinc-300 text-lg">
                {{ releaseDate }}
              </h3>
            </ElementWithPoint>
            <div class="bg-red-700 px-3 rounded-[5px] ml-2 text-white">
              <p class="leading-6 font-medium">
                {{ content.vote_average?.toFixed(1) || content.popularity }}
              </p>
            </div>
          </div>
        </div>

        <GenresList
          v-if="content.genre_ids?.[0]"
          :genres="genres"
          :contentType="contentType === 'filme' ? 'filmes' : 'tv'"
        />

        <p
          v-if="content.overview"
          class="max-w-[600px] text-zinc-300 line-clamp-5 leading-6 font-medium"
        >
          {{ content.overview }}
        </p>

        <Button
          variant="destructive"
          class="rounded-[7px] px-7 py-5"
          :class="{ 'mt-3': !content.overview }"
          @click="goToDetails"
        >
          <div class="flex items-center gap-x-2">
            <PlayCircleIcon class="size-5" />
            <span class="text-base">Detalhes</span>
          </div>
        </Button>
      </div>
    </div>
    <div v-else class="h-full w-full bg-outline animate-pulse" />
  </div>
</template>
