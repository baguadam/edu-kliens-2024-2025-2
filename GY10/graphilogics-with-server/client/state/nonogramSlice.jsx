import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  solution: [],
  table: [],
};

const nonogramSlice = createSlice({
  name: "nonogramSlice",
  initialState,
  reducers: {
    addSolution: (state, { payload: solution }) => {
      state.solution.push(solution);
    },
  },
});

// actions
export const { addSolution } = nonogramSlice.actions;

// selector
export const selectSolution = (state) => state.solution;
export const selectTable = (state) => state.table;

// reducer
export const nonogramReducer = nonogramSlice.reducer;
