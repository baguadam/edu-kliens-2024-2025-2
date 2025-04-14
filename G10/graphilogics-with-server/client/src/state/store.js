import { configureStore } from "@reduxjs/toolkit";
import { nonogramReducer } from "./nonogramSlice";

export const store = configureStore({
  reducer: nonogramReducer,
});
