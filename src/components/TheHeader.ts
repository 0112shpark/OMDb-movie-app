import { Component } from "../core/my";

interface State {
  [key: string]: unknown;
  menus: {
    name: string;
    href: string;
  }[];
}

export default class TheHeader extends Component {
  // 할당 선언 => constructor로 만든 state보다 이 class내의 state가 우선순위를 가짐
  // render함수가 다시 실행될때, constructor이 아닌 여기서 선언된 state사용.
  // 초기화시, state = {} as State 형식으로 빈 객체로 할당하게 되면
  // render함수 재실행시 빈 객체를 사용하게됨.
  // !를 사용해서 초기화를 한 것처럼 하는 할당선언 사용
  public state!: State;
  constructor() {
    super({
      tagName: "header",
      state: {
        menus: [
          {
            name: "Search",
            href: "#/",
          },
          {
            name: "Movie",
            href: "#/movie?id=tt4520988",
          },
          {
            name: "About",
            href: "#/about",
          },
        ],
      },
    });

    window.addEventListener("popstate", () => {
      this.render();
    });
  }
  render() {
    this.el.innerHTML = /*html*/ `
    <a href ="#/" class= "logo">
      <span>OMDBAPI</span>
      .COM
    </a>
    <nav>
      <ul>
        ${this.state.menus
          .map((menu) => {
            const href = menu.href.split("?")[0];
            const hash = location.hash.split("?")[0];
            const isActive = href === hash;
            return /*html*/ `
          <li>
            <a 
              class  = "${isActive ? "active" : ""}"
              href = "${menu.href}">
              ${menu.name}
            </a>
          </li>
          `;
          })
          .join("")}
      </ul>
    </nav>

    <a href ="#/about" class = "user">
      <img src = "https://avatars.githubusercontent.com/u/66255101?v=4" alt ="User"/>
    </a>
    `;
  }
}
