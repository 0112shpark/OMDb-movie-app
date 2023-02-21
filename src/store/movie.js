import { Store } from "../core/my";

const store = new Store({
  searchText: "",
  page: 1,
  pageMax: 1,
  movies: [], //movie lists
  movie: {}, //movie details
  loading: false,
  message: "Search for the movie title!",
});

export default store;
export const searchMovies = async (page) => {
  store.state.loading = true;
  store.state.page = page;
  if (page === 1) {
    store.state.movies = [];
    store.state.message = "";
  }
  try {
    const res = await fetch(
      `https://omdbapi.com?apikey=d55d3038&s=${store.state.searchText}&page=${page}`
    );
    // 각 속성의 값만 받아온다.
    const { Search, totalResults, Response, Error } = await res.json();
    if (Response === "True") {
      store.state.movies = [...store.state.movies, ...Search];
      store.state.pageMax = Math.ceil(Number(totalResults) / 10);
    } else {
      store.state.message = Error;
    }
  } catch (error) {
    console.log("searchMoviesError:", error);
  } finally {
    store.state.loading = false;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const res = await fetch(
      `https://omdbapi.com?apikey=d55d3038&i=${id}&plot=full`
    );
    store.state.movie = await res.json();
  } catch (error) {
    console.log("getMovieDetails error:", error);
  }
};
