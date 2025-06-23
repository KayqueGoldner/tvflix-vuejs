<script setup lang="ts">
import SidebarItem from "@/components/SidebarItem.vue";
</script>

<template>
  <nav
    class="h-full flex flex-col px-5 pt-5 sm:pt-8 bg-slate-950 overflow-y-auto w-[250px] shrink-0"
  >
    <SidebarItem href="/" label="Home" />
    <div class="mt-10">
      <h1 class="text-xl mb-3 font-semibold text-white">Categorias</h1>
      <div class="flex flex-col gap-y-3">
        <SidebarItem href="/navegar/filmes" label="Filmes" />
        <SidebarItem href="/navegar/tv" label="Programas de TV" />
        <SidebarItem href="/navegar/personalidades" label="Personalidades" />
      </div>
    </div>
    <div class="mt-auto">
      <h1 class="text-sm flex items-center gap-x-1.5 text-white/70 font-medium">
        Developed by
        <a
          href="https://github.com/KayqueGoldner"
          class="hover:underline text-white"
          target="_blank"
        >
          Kayque Goldner
        </a>
      </h1>
      <a
        href="https://www.themoviedb.org/"
        target="_blank"
        class="py-4 block"
        title="https://www.themoviedb.org/"
      >
        <img src="/tmdb-logo.png" width="160" height="48" alt="tmdb logo" />
      </a>
    </div>
  </nav>
</template>
