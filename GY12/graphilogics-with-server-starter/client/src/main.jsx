import React from "react";
import App from "./views/App";
import "./index.css";
import "./grafilogika.css";
import { createRoot } from "react-dom/client";
import { store } from "./state/store";
import { Provider } from "react-redux";
import { checkSolution, startGame } from "./state/nonogramSlice";
import { getPuzzles } from "./state/listSlice";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

store.dispatch(startGame(["##", "  "]));
store.dispatch(getPuzzles());
store.dispatch(checkSolution());

// setTimeout(() => store.dispatch(startSolutionCheck()), 3000);
// setTimeout(() => store.dispatch(stopSolutionCheck()), 8000);
