import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./bookSlice";
import { filterReducer } from "./filterSlice";

export const store = configureStore({
  reducer: {
    book: bookReducer,
    filter: filterReducer,
  },
});
