import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPuzzles.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
  },
});

// Reducer
export const listReducer = listSlice.reducer;

// Actions
export const fetchPuzzles = createAsyncThunk("puzzles", async () => {
  const response = await fetch("http://localhost:3030/puzzles");
  const result = await response.json();
  return result.data;
});

// Selector
