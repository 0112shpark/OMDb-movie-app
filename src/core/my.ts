// Component
interface ComponentPayload {
  tagName?: string;
  props?: {
    [key: string]: unknown;
  };
  state?: {
    [key: string]: unknown;
  };
}

export class Component {
  public el;
  public props;
  public state;
  constructor(payload: ComponentPayload = {}) {
    const { tagName = "div", props = {}, state = {} } = payload;
    this.el = document.createElement(tagName);
    this.state = state;
    this.props = props;
    this.render();
  }
  render() {}
}

//Router
interface Route {
  path: string;
  component: typeof Component;
}
type Routes = Route[];

function routeRender(routes: Routes) {
  if (!location.hash) {
    // hash가 없을경우, component를 생성할 수 없다.
    // main page로 이동시켜주는 부분.
    history.replaceState(null, "", "/#/");
  }

  const routerView = document.querySelector("router-view");
  // ?기준으로 나누기
  const [hash, queryString = ""] = location.hash.split("?");

  // query string을 객체로 변환해 history의 state에 저장
  interface Query {
    [key: string]: string;
  }

  const query = queryString.split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    acc[key] = value;

    return acc;
  }, {} as Query);
  // query string의 key, value를 history객체의 state 부분에 저장
  history.replaceState(query, "", "");

  // 현재 route정보 찾기
  const currentRoute = routes.find((route) => {
    //앞의 hash부분만 추출
    return new RegExp(`${route.path}/?$`).test(hash);
  });
  if (routerView) {
    routerView.innerHTML = "";
    currentRoute && routerView.append(new currentRoute.component().el);
  }

  window.scrollTo(0, 0);
}

export function createRouter(routes: Routes) {
  return function () {
    window.addEventListener("popstate", () => {
      routeRender(routes);
    });
    routeRender(routes);
  };
}

/// Store (data 저장소)
interface StoreObservers {
  [key: string]: SubscribeCallback[];
}
interface SubscribeCallback {
  (arg: unknown): void;
}
export class Store<S> {
  public state = {} as S;
  private observers = {} as StoreObservers;
  constructor(state: S) {
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
  subscribe(key: string, cb: SubscribeCallback) {
    // { message : [()=>{}, ()=>{},...]
    Array.isArray(this.observers[key])
      ? //배열데이터면 push를 사용해 뒤에 붙임
        this.observers[key].push(cb)
      : // 배열데이터가 아니면 callback함수를 배열의 0번째로 넣어
        // observers[key]의 속성에 대입
        (this.observers[key] = [cb]);
  }
}
