import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  editor: "",
  selectedIndex: null,
  haikus: [
    `Téged vártalak
    Mint hajnali fényt éjjel
    Félve-remélve`,
  ],
};

const vowels = "aáeéiíuúüűoóöúAÁEÉIÍUÚÜŰOÓÖŐ";

const haikuSlice = createSlice({
  name: "haikuSlice",
  initialState,
  reducers: {
    changeText: (state, { payload: editor }) => {
      state.editor = editor;
    },
    addHaiku: (state, { payload: haiku }) => {
      state.haikus.push(haiku);
      state.selectedIndex = null;
    },
    selectHaiku: (state, { payload: idx }) => {
      state.selectedIndex = idx;
      state.editor = state.haikus[idx];
    },
    modifyHaiku: (state, { payload: editor }) => {
      if (state.selectedIndex !== null) {
        state.haikus[state.selectedIndex] = editor;
      }
    },
    removeHaiku: (state) => {
      if (state.selectedIndex !== null) {
        state.haikus.splice(state.selectedIndex, 1);
      }
    },
  },
});

// actions
export const { changeText, addHaiku, selectHaiku, modifyHaiku, removeHaiku } = haikuSlice.actions;

// selector
const selectEditor = (state) => state.editor;

export const selectHaikus = (state) => state.haikus;
export const selectSelectedIndex = (state) => state.selectedIndex;
export const selectEditorObject = createSelector([selectEditor], (editor) => {
  const vowelsPerRow = editor
    .split("\n")
    .map((row) => row.split("").filter((c) => vowels.includes(c)))
    .map((row) => row.length);
  const isHaiku = vowelsPerRow.length === 3 && vowelsPerRow[0] === 5 && vowelsPerRow[1] === 7 && vowelsPerRow[2] === 5;

  return {
    editor,
    vowelsPerRow,
    isHaiku,
  };
});

// reducer
export const haikuReducer = haikuSlice.reducer;
