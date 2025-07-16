<script setup lang="ts">
import { ref, onMounted } from "vue";
import useEmblaCarousel from "embla-carousel-vue";
import type { EmblaOptionsType } from "embla-carousel";

import type { ItvWithMovie } from "@/types";
import { cn } from "@/lib/utils";

import ScrollbarSliderPrevBtn from "./ScrollbarSliderPrevBtn.vue";
import ScrollbarSliderNextBtn from "./ScrollbarSliderNextBtn.vue";

const props = defineProps<{
  filter?: any;
  title?: string;
  list?: Omit<ItvWithMovie, "genre_ids">[];
  className?: string;
}>();

const OPTIONS: EmblaOptionsType = {
  slidesToScroll: "auto",
  containScroll: "trimSnaps",
};

const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
const prevBtnDisabled = ref(true);
const nextBtnDisabled = ref(true);
const scrollProgress = ref(0);

const scrollPrev = () => emblaApi.value?.scrollPrev();
const scrollNext = () => emblaApi.value?.scrollNext();

const onSelect = () => {
  if (!emblaApi.value) return;
  prevBtnDisabled.value = !emblaApi.value.canScrollPrev();
  nextBtnDisabled.value = !emblaApi.value.canScrollNext();
};

const onScroll = () => {
  if (!emblaApi.value) return;
  const progress = Math.max(0, Math.min(1, emblaApi.value.scrollProgress()));
  scrollProgress.value = progress * 100;
};

onMounted(() => {
  if (emblaApi.value) {
    onScroll();
    onSelect();
    emblaApi.value.on("reInit", onSelect);
    emblaApi.value.on("select", onSelect);
    emblaApi.value.on("scroll", onScroll);
  }
});
</script>

<template>
  <div :class="cn('relative', props.className)">
    <div
      :class="
        cn(
          'flex items-center justify-between py-3',
          !props.title && !$slots.default && 'justify-end mb-2'
        )
      "
    >
      <div class="flex items-center gap-x-3">
        <h1
          v-if="props.title"
          class="text-xl sm:text-2xl capitalize font-semibold leading-5 text-white"
        >
          {{ props.title }}
        </h1>
        <slot name="filter">{{ props.filter }}</slot>
      </div>
      <div class="flex items-center gap-x-1">
        <ScrollbarSliderPrevBtn
          :disabled="prevBtnDisabled"
          @click="scrollPrev"
        />
        <ScrollbarSliderNextBtn
          :disabled="nextBtnDisabled"
          @click="scrollNext"
        />
      </div>
    </div>
    <div class="embla relative space-y-2" ref="emblaRef">
      <div class="embla__container">
        <slot />
      </div>
      <div class="embla__progress bg-outline">
        <div
          class="embla__progress__bar bg-darkRed"
          :style="{ transform: `translate3d(${scrollProgress}%,0px,0px)` }"
        />
      </div>
    </div>
  </div>
</template>
