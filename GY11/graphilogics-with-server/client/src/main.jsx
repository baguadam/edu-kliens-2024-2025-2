import React from "react";
import App from "./views/App";
import "./index.css";
import "./grafilogika.css";
import { createRoot } from "react-dom/client";
import { store } from "./state/store";
import { Provider } from "react-redux";
import { checkSolution, startGame } from "./state/nonogramSlice";
import { fetchPuzzles } from "./state/listSlice";

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

// setTimeout(() => store.dispatch(startSolutionCheck()), 5000);
// setTimeout(() => store.dispatch(stopSolutionCheck()), 10000);

store.dispatch(checkSolution());
store.dispatch(fetchPuzzles());
