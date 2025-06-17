<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const props = defineProps<{
  onClose: () => void;
}>();

const search = ref("");
const router = useRouter();

const handleSearch = () => {
  if (!search.value) return;

  router.push({
    path: "/pesquisar",
    query: {
      query: search.value,
    },
  });

  props.onClose();
};
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <Input
      v-model="search"
      placeholder="Pesquisar"
      class="border-0 bg-slate-900 text-white"
      @keydown.enter="handleSearch"
    />
    <Button variant="destructive" @click="handleSearch"> Pesquisar </Button>
  </div>
</template>
