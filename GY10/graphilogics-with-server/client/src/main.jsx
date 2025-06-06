import React from "react";
import App from "./views/App";
import { Provider } from "react-redux";
import "./index.css";
import "./grafilogika.css";
import { createRoot } from "react-dom/client";
import { store } from "../state/store";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
