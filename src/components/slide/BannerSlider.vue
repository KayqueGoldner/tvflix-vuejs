<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import EmblaCarousel from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-vue-next";

import BannerSlideItem from "./BannerSliderItem.vue";
import type { ItvWithMovie, Igenres } from "../../types/index";
import Button from "../ui/button/Button.vue";

defineProps<{
  data: ItvWithMovie[];
  genres: Igenres[];
}>();

const emblaRef = ref<HTMLElement | null>(null);
const embla = ref<ReturnType<typeof EmblaCarousel> | null>(null);
const slidesInView = ref<number[]>([]);
const prevBtnDisabled = ref(true);
const nextBtnDisabled = ref(true);

const updateSlidesInView = () => {
  if (!embla.value) return;
  const current = embla.value
    .slidesInView()
    .filter((i) => !slidesInView.value.includes(i));
  slidesInView.value = slidesInView.value.concat(current);

  if (slidesInView.value.length === embla.value.slideNodes().length) {
    embla.value.off("slidesInView", updateSlidesInView);
  }
};

const onSelect = () => {
  if (!embla.value) return;
  prevBtnDisabled.value = !embla.value.canScrollPrev();
  nextBtnDisabled.value = !embla.value.canScrollNext();
};

const scrollPrev = () => embla.value?.scrollPrev();
const scrollNext = () => embla.value?.scrollNext();

onMounted(() => {
  if (!emblaRef.value) return;

  embla.value = EmblaCarousel(emblaRef.value, {}, [Autoplay()]);
  updateSlidesInView();
  onSelect();

  embla.value.on("slidesInView", updateSlidesInView);
  embla.value.on("reInit", () => {
    updateSlidesInView();
    onSelect();
  });
  embla.value.on("select", onSelect);
});

onUnmounted(() => {
  embla.value?.destroy();
});
</script>

<template>
  <div class="embla rounded-[15px] relative" ref="emblaRef">
    <div class="embla__container rounded-[15px] flex">
      <BannerSlideItem
        v-for="(item, index) in data"
        :key="item.id"
        :content="item"
        :genres="genres.filter((g) => item.genre_ids?.includes(g.id))"
        :in-view="slidesInView.includes(index)"
      />
    </div>

    <div class="flex items-center gap-x-1 absolute top-5 right-5">
      <Button
        class="size-8 hover:bg-destructive"
        :disabled="prevBtnDisabled"
        @click="scrollPrev"
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        class="size-8 hover:bg-destructive"
        :disabled="nextBtnDisabled"
        @click="scrollNext"
      >
        <ArrowRightIcon />
      </Button>
    </div>
  </div>
</template>
