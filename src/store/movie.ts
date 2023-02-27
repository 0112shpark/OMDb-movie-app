import { Store } from "../core/my";

interface State {
  searchText: string;
  page: number;
  pageMax: number;
  movies: SimpleMovie[]; //movie lists
  movie: DetailedMovie; //movie details
  loading: boolean;
  message: string;
}
export interface SimpleMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
interface DetailedMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface Rating {
  Source: string;
  Value: string;
}
const store = new Store<State>({
  searchText: "",
  page: 1,
  pageMax: 1,
  movies: [], //movie lists
  movie: {} as DetailedMovie, //movie details
  loading: false,
  message: "Search for the movie title!",
});

export default store;
export const searchMovies = async (page: number) => {
  store.state.loading = true;
  store.state.page = page;
  if (page === 1) {
    store.state.movies = [];
    store.state.message = "";
  }
  try {
    // const res = await fetch(
    //   `https://omdbapi.com?apikey=d55d3038&s=${store.state.searchText}&page=${page}`
    // );
    const res = await fetch("/api/movie", {
      method: "POST",
      body: JSON.stringify({
        title: store.state.searchText,
        page,
      }),
    });
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

export const getMovieDetails = async (id: string) => {
  try {
    // const res = await fetch(
    //   `https://omdbapi.com?apikey=d55d3038&i=${id}&plot=full`
    // );
    const res = await fetch("/api/movie", {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    });
    store.state.movie = await res.json();
  } catch (error) {
    console.log("getMovieDetails error:", error);
  }
};
