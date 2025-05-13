import { configureStore } from "@reduxjs/toolkit";
import { nonogramReducer } from "./nonogramSlice";
import { listSliceReducer } from "./listSlice";
import { nonogramApi } from "./nonogramApiSlice";
import { authReducer } from "./authSlice";

export const store = configureStore({
  reducer: {
    nonogram: nonogramReducer,
    list: listSliceReducer,
    auth: authReducer,
    [nonogramApi.reducerPath]: nonogramApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(nonogramApi.middleware),
});
