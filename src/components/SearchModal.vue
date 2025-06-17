<script lang="ts" setup>
import { SearchIcon } from "lucide-vue-next";
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import SearchModalForm from "@/components/SearchModalForm.vue";

const open = ref(false);

const handleClose = () => {
  open.value = false;
};
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button
        class="bg-neutral-700 w-48 h-11 hover:bg-neutral-700 cursor-text justify-start text-neutral-300"
      >
        <SearchIcon class="size-5" />
        Pesquisar
      </Button>
    </DialogTrigger>
    <DialogContent class="pt-10">
      <SearchModalForm :onClose="handleClose" />
    </DialogContent>
  </Dialog>
</template>
