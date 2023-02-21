import { Component } from "../core/my";
import movieStore, { searchMovies } from "../store/movie";

export default class MovieListMore extends Component {
  constructor() {
    super({
      tagName: "button",
    });
    movieStore.subscribe("pageMax", () => {
      const { page, pageMax } = movieStore.state;
      if (pageMax > page) {
        this.el.classList.remove("hide");
      } else {
        this.el.classList.add("hide");
      }
    });
  }
  render() {
    this.el.classList.add("btn", "view-more", "hide");
    this.el.textContent = "View more..";

    this.el.addEventListener("click", async () => {
      await searchMovies(movieStore.state.page + 1);
    });
  }
}
