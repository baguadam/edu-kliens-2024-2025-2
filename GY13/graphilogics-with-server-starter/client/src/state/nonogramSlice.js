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
    fillCell: (state, { payload: { row, column, color } }) => {
      state.table[row][column] = color;
    },
  },
});

// Reducer
export const nonogramReducer = nonogramSlice.reducer;

// Actions
export const { startGame, startSolutionCheck, stopSolutionCheck, fillCell } = nonogramSlice.actions;
export const checkSolution = () => (dispatch) => {
  setTimeout(() => dispatch(startSolutionCheck()), 3000);
  setTimeout(() => dispatch(stopSolutionCheck()), 8000);
};

// Selectors
const selectSolution = (state) => state.nonogram.solution;

export const selectTable = (state) => state.nonogram.table;

export const selectSolutionObject = createSelector([selectSolution], (solution) => {
  // left side numbers
  const leftNumbers = solution.map((row) =>
    row
      .join("")
      .split("2")
      .filter((e) => e !== "")
      .map((e) => e.length)
  );

  // upper side numbers
  const upperNumbers = solution[0]?.map((e, i) =>
    solution
      .map((row) => row[i])
      .join("")
      .split("2")
      .filter((e) => e !== "")
      .map((e) => e.length)
  );

  return { leftNumbers, upperNumbers };
});
