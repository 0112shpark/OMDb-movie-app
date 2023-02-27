import { Component } from "../core/my";
import movieStore from "../store/movie";
import MovieItem from "./MovieItem";

export default class MovieList extends Component {
  constructor() {
    super();
    //movieStore의 객체에 subscribe함수에 callback함수 등록.
    movieStore.subscribe("movies", () => {
      this.render();
    });
    movieStore.subscribe("loading", () => {
      this.render();
    });
    movieStore.subscribe("message", () => {
      this.render();
    });
  }
  render() {
    this.el.classList.add("movie-list");
    this.el.innerHTML = /* html*/ `
    ${
      movieStore.state.message
        ? `<div class = "message">${movieStore.state.message}</div>`
        : '<div class="movies"></div>'
    }
    <div class="the-loader hide"></div>
    `;

    const moviesEl = this.el.querySelector(".movies");
    moviesEl?.append(
      ...movieStore.state.movies.map((movie) => {
        return new MovieItem({
          movie: movie,
        }).el;
      })
    );

    const loaderEl = this.el.querySelector(".the-loader");
    movieStore.state.loading
      ? loaderEl?.classList.remove("hide")
      : loaderEl?.classList.add("hide");
  }
}
