import { Store } from "../core/my";

interface State {
  photo: string;
  name: string;
  email: string;
  github: string;
  repository: string;
}

export default new Store<State>({
  photo: "https://avatars.githubusercontent.com/u/66255101?v=4",
  name: "0112shpark / Park SeongHyeon",
  email: "000112shpark@naver.com",
  github: "https://github.com/0112shpark",
  repository: "https://github.com/0112shpark/OMDb-movie-app",
});
