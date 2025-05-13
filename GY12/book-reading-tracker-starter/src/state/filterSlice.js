import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "all", // 'all' || 'read' || 'unread'
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setStatus: (state, { payload: status }) => {
      state.status = status;
    },
  },
});

// reducer
export const filterReducer = filterSlice.reducer;

// actions
export const { setStatus } = filterSlice.actions;

// selectors
export const selectStatus = (state) => state.filter.status;
