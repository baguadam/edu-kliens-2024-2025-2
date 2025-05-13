import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  solution: [],
  table: [],
  isSolutionChecked: false,
};

export const COLORS = {
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
    startSolutionCheck: (state) => {
      state.isSolutionChecked = true;
    },
    stopSolutionCheck: (state) => {
      state.isSolutionChecked = false;
    },
    clickCell: (state, { payload: { row, col, color } }) => {
      state.table[row][col] = color;
    },
  },
});

// Reducer
export const nonogramReducer = nonogramSlice.reducer;

// Actions
export const { startGame, startSolutionCheck, stopSolutionCheck, clickCell } = nonogramSlice.actions;
export const checkSolution = () => (dispatch) => {
  setTimeout(() => dispatch(startSolutionCheck()), 5000);
  setTimeout(() => dispatch(stopSolutionCheck()), 10000);
};

// Selector
const selectSolution = (state) => state.nonogram.solution;
const selectTable = (state) => state.nonogram.table;

export const selectIsSolutionChecked = (state) => state.nonogram.isSolutionChecked;
export const selectSolutionObject = createSelector([selectSolution, selectTable], (solution, table) => {
  // left side numbers
  const leftSideNumbers = solution.map((row) =>
    row
      .join("")
      .split("2")
      .filter((e) => e !== "")
      .map((e) => e.length)
  );

  // upper side numbers
  const upperSideNumbers = solution[0]?.map((e, i) =>
    solution
      .map((row) => row[i])
      .join("")
      .split("2")
      .filter((e) => e !== "")
      .map((e) => e.length)
  );

  return {
    table,
    leftSideNumbers,
    upperSideNumbers,
  };
});
