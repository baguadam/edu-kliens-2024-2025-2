import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./views/App";
import TrackServiceProvider from "./contexts/TrackServiceProvider";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <TrackServiceProvider>
      <App />
    </TrackServiceProvider>
  </React.StrictMode>
);
