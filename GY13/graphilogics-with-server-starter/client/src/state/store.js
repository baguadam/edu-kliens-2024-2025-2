import { configureStore } from "@reduxjs/toolkit";
import { nonogramReducer } from "./nonogramSlice";
import { listSliceReducer } from "./listSlice";
import { puzzlesApi } from "./puzzlesApiSlice";
import { authReducer } from "./authSlice";

export const store = configureStore({
  reducer: {
    nonogram: nonogramReducer,
    list: listSliceReducer,
    auth: authReducer,
    [puzzlesApi.reducerPath]: puzzlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(puzzlesApi.middleware),
});
