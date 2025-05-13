import { configureStore } from "@reduxjs/toolkit";
import { nonogramReducer } from "./nonogramSlice";
import { listReducer } from "./listSlice";

export const store = configureStore({
  reducer: {
    nonogram: nonogramReducer,
    list: listReducer,
  },
});
