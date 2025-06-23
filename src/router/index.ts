import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Home from "@/pages/Home.vue";
import Search from "@/pages/Search.vue";
import Movies from "@/pages/Movies.vue";
import Tv from "@/pages/Tv.vue";
import Personalities from "@/pages/Personalities.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "pesquisar",
        name: "Search",
        component: Search,
      },
      {
        path: "navegar/filmes",
        name: "Movies",
        component: Movies,
      },
      {
        path: "navegar/tv",
        name: "Tv",
        component: Tv,
      },
      {
        path: "navegar/personalidades",
        name: "Personalities",
        component: Personalities,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
