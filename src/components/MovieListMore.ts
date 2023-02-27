import { Component } from "../core/my";
import movieStore, { searchMovies } from "../store/movie";

export default class MovieListMore extends Component {
  constructor() {
    super({
      tagName: "button",
    });
    movieStore.subscribe("pageMax", () => {
      const { page, pageMax } = movieStore.state;
      console.log("subs:", pageMax);
      if (pageMax > page) {
        this.el.classList.remove("hide");
      } else {
        this.el.classList.add("hide");
      }
    });
  }
  render() {
    console.log(movieStore.state.pageMax);
    if (!movieStore.state.message) {
      this.el.classList.add("btn", "view-more");
    } else {
      this.el.classList.add("btn", "view-more", "hide");
    }
    this.el.textContent = "View more..";

    this.el.addEventListener("click", async () => {
      this.el.classList.add("hide");
      await searchMovies(movieStore.state.page + 1);
    });
  }
}
