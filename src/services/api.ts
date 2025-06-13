import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    language: "pt-BR",
  },
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export default api;
