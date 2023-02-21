// Component
export class Component {
  constructor(payload = {}) {
    const { tagName = "div", state = {}, props = {} } = payload;
    this.el = document.createElement(tagName);
    this.state = state;
    this.props = props;
    this.render();
  }
  render() {}
}

//Router

function routeRender(routes) {
  if (!location.hash) {
    // hash가 없을경우, component를 생성할 수 없다.
    // main page로 이동시켜주는 부분.
    history.replaceState(null, "", "/#/");
  }

  const routerView = document.querySelector("router-view");
  const [hash, queryString = ""] = location.hash.split("?");

  const query = queryString.split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    acc[key] = value;

    return acc;
  }, {});
  // query string의 key, value를 history객체의 state 부분에 저장
  history.replaceState(query, "", "");
  const currentRoute = routes.find((route) => {
    //앞의 hash부분만 추출
    return new RegExp(`${route.path}/?$`).test(hash);
  });
  routerView.innerHTML = "";
  routerView.append(new currentRoute.component().el);

  window.scrollTo(0, 0);
}

export function createRouter(routes) {
  return function () {
    window.addEventListener("popstate", () => {
      routeRender(routes);
    });
    routeRender(routes);
  };
}

/// Store (data 저장소)

export class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => {
          return state[key]; //state['message']
        },
        set: (val) => {
          state[key] = val;
          if (Array.isArray(this.observers[key])) {
            this.observers[key].forEach((observer) => observer(val));
          }
        },
      });
    }
  }
  subscribe(key, cb) {
    // { message : [()=>{}, ()=>{},...]
    Array.isArray(this.observers[key])
      ? //배열데이터면 push를 사용해 뒤에 붙임
        this.observers[key].push(cb)
      : // 배열데이터가 아니면 callback함수를 배열의 0번째로 넣어
        // observers[key]의 속성에 대입
        (this.observers[key] = [cb]);
  }
}
