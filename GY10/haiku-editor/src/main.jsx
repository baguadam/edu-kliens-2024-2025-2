import React from "react";
import App from "./App";
// import { store } from "./state/store";
// import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./state/store";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// const unsubscribe = store.subscribe(() => console.log(store.getState()));
// store.dispatch({
//   type: "CHANGE_TEXT",
//   payload: "alma",
// });
// store.dispatch({
//   type: "CHANGE_TEXT",
//   payload: "alm",
// });
