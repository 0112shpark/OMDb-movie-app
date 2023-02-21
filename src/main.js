import App from "./App";
import router from "./routes";

const roote = document.querySelector("#root");
roote.append(new App().el);

router();
