import { configureStore } from "@reduxjs/toolkit";
import { haikuReducer } from "./haikuSlice";

// store
export const store = configureStore({
  reducer: haikuReducer,
});
