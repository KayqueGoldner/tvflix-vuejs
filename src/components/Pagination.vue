<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-vue-next";

import Button from "@/components/ui/button/Button.vue";
import { cn } from "@/lib/utils";

interface PaginationProps {
  maxPages: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

const props = withDefaults(defineProps<PaginationProps>(), {
  initialPage: 1,
  isLoading: false,
});

const emit = defineEmits<{
  (e: "pageChange", page: number): void;
}>();

const router = useRouter();
const maxPages = ref(props.maxPages > 500 ? 500 : props.maxPages);
const routeChanging = ref(false);

const pathname = router.currentRoute.value.path;
const query = router.currentRoute.value.query;
const pageValue = ref(query.page ? Number(query.page) : props.initialPage);

const sanitizePage = (page: number): number => {
  if (isNaN(page) || page < 1) return 1;
  if (page > maxPages.value) return maxPages.value;
  return page;
};

const handleRoute = (page: number) => {
  const sanitizedPage = sanitizePage(page);
  if (sanitizedPage === pageValue.value) return;

  routeChanging.value = true;
  pageValue.value = sanitizedPage;

  router.push({
    path: pathname,
    query: {
      ...query,
      page: sanitizedPage,
    },
  });

  emit("pageChange", sanitizedPage);
};

const handleKeyNavigation = (e: KeyboardEvent) => {
  if (e.key === "ArrowLeft" && pageValue.value > 1) {
    handleRoute(pageValue.value - 1);
  } else if (e.key === "ArrowRight" && pageValue.value < maxPages.value) {
    handleRoute(pageValue.value + 1);
  }
};

watch(
  () => router.currentRoute.value.query.page,
  (newPage) => {
    pageValue.value = newPage ? sanitizePage(Number(newPage)) : 1;
    routeChanging.value = false;
  }
);
</script>

<template>
  <nav
    role="navigation"
    aria-label="Pagination Navigation"
    @keydown="handleKeyNavigation"
    class="relative flex items-center justify-center gap-x-1 sm:gap-x-2 pt-7"
  >
    <Button
      :class="
        cn(
          'bg-slate-950 hover:bg-destructive border-0 rounded-[100%] w-9 h-9 p-0 shrink-0',
          (pageValue === 1 || props.isLoading) &&
            'opacity-50 pointer-events-none',
          routeChanging && 'opacity-50 pointer-events-none'
        )
      "
      :disabled="pageValue === 1 || routeChanging || props.isLoading"
      @click="handleRoute(pageValue - 1)"
      aria-label="Previous page"
    >
      <ArrowLeftIcon class="size-5" />
    </Button>

    <Button
      v-if="pageValue >= 5"
      :class="
        cn(
          'bg-slate-950 hover:bg-destructive border-0 rounded-[7px] px-4 font-medium text-base w-9 h-9',
          (routeChanging || props.isLoading) && 'opacity-50 pointer-events-none'
        )
      "
      @click="handleRoute(1)"
      aria-label="Go to first page"
    >
      1
    </Button>
    <Button
      v-if="pageValue >= 5"
      :class="
        cn(
          'rounded-[7px] w-9 h-9 p-0 shrink-0 hover:bg-destructive',
          (routeChanging || props.isLoading) && 'opacity-50 pointer-events-none'
        )
      "
      @click="handleRoute(pageValue - 4)"
      aria-label="Go back 4 pages"
    >
      <ChevronsLeftIcon class="size-5" />
    </Button>

    <Button
      v-if="pageValue > 1"
      :class="
        cn(
          'bg-slate-950 hidden sm:flex items-center justify-center hover:bg-destructive border-0 rounded-[7px] font-medium text-[15px] w-9 h-9',
          (routeChanging || props.isLoading) && 'opacity-50 pointer-events-none'
        )
      "
      @click="handleRoute(pageValue - 1)"
      :aria-label="`Go to page ${pageValue - 1}`"
    >
      {{ pageValue - 1 }}
    </Button>

    <Button
      disabled
      :class="
        cn(
          'bg-white text-black rounded-full text-[15px] w-9 h-9 font-medium',
          (routeChanging || props.isLoading) && 'opacity-50'
        )
      "
      :aria-label="`Current page, page ${pageValue}`"
      aria-current="page"
    >
      {{ pageValue }}
    </Button>

    <Button
      v-if="pageValue < maxPages && pageValue < maxPages - 1"
      :class="
        cn(
          'bg-slate-950 hidden sm:flex items-center justify-center hover:bg-destructive border-0 rounded-[7px] px-3 py-0 font-medium text-[15px] w-9 h-9',
          (routeChanging || props.isLoading) && 'opacity-50 pointer-events-none'
        )
      "
      @click="handleRoute(pageValue + 1)"
      :aria-label="`Go to page ${pageValue + 1}`"
    >
      {{ pageValue + 1 }}
    </Button>

    <Button
      v-if="pageValue <= maxPages - 4"
      :class="
        cn(
          'rounded-[7px] w-9 h-9 p-0 shrink-0 hover:bg-destructive',
          (routeChanging || props.isLoading) && 'opacity-50 pointer-events-none'
        )
      "
      @click="handleRoute(pageValue + 4)"
      aria-label="Go forward 4 pages"
    >
      <ChevronsRightIcon class="size-5" />
    </Button>

    <Button
      v-if="pageValue < maxPages"
      :class="
        cn(
          'bg-slate-950 hover:bg-destructive border-0 rounded-[7px] font-medium text-[15px] w-9 h-9',
          (routeChanging || props.isLoading) && 'opacity-50 pointer-events-none'
        )
      "
      @click="handleRoute(maxPages)"
      :aria-label="`Go to last page, page ${maxPages}`"
    >
      {{ maxPages }}
    </Button>

    <Button
      :class="
        cn(
          'bg-slate-950 hover:bg-destructive border-0 rounded-[100%] w-9 h-9 p-0 shrink-0',
          (pageValue >= maxPages || props.isLoading) &&
            'opacity-50 pointer-events-none',
          routeChanging && 'opacity-50 pointer-events-none'
        )
      "
      :disabled="pageValue >= maxPages || routeChanging || props.isLoading"
      @click="handleRoute(pageValue + 1)"
      aria-label="Next page"
    >
      <ArrowRightIcon class="size-5" />
    </Button>
  </nav>
</template>
