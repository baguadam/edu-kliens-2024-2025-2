import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const authReducer = authSlice.reducer;

// actions
export const { login, logout } = authSlice.actions;

// selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
