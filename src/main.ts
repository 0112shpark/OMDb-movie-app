import App from "./App";
import router from "./routes";

const roote = document.querySelector("#root");
roote?.append(new App().el);

router();

// (async () => {
//   const res = await fetch("/api/test.js");
//   console.log("hello");
//   const json = await res.json();
//   console.log("/api/test", json);
// })();
