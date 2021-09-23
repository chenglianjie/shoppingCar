import dva from "dva";
import App from "./App";
import HomeModel from "./modal/index";
import TestModel from "./modal/test";
import createHistory from "history/createHashHistory";
const app = dva({
  history: createHistory(),
});
app.model(HomeModel);
app.model(TestModel);
app.router(() => <App />);
app.start("#root");
