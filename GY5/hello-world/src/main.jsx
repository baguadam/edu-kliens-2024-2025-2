import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Hello from "./Hello";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Hello name="Győző">
      <p>Hogy vagy ma?</p>
      <p>Remélem, jól</p>
    </Hello>
    <Hello name="Peti" />
  </React.StrictMode>
);
