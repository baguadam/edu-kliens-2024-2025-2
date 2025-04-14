import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  solution: [],
  table: [],
};

const COLORS = {
  WHITE: 0,
  BLACK: 1,
  GRAY: 2,
};

const nonogramSlice = createSlice({
  name: "nonogram",
  initialState,
  reducers: {
    startGame: (state, { payload: solution }) => {
      state.table = solution.map((row) => row.split("").map(() => COLORS.WHITE));
      state.solution = solution.map((row) => row.split("").map((c) => (c === "#" ? COLORS.BLACK : COLORS.GRAY)));
    },
  },
});

// Reducer
export const nonogramReducer = nonogramSlice.reducer;

// Actions
export const { startGame } = nonogramSlice.actions;
