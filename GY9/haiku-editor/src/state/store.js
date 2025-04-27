import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  editor: "",
  selectedIndex: null,
  haikus: [
    `Téged vártalak
  Mint hajnali fényt éjjel
  Félve-remélve`,
  ],
};

// const reducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case "CHANGE_TEXT":
//       return { ...state, editor: payload };
//     default:
//       return state;
//   }
// };

export const changeText = createAction("haikus/changeText");
export const addHaiku = createAction("haikus/addHaiku");

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeText, (state, { payload }) => {
      state.editor = payload;
    })
    .addCase(addHaiku, (state, { payload }) => {
      state.haikus.push(payload);
    });
});

export const store = configureStore({
  reducer,
});

export const selectEditor = (state) => state.editor;
export const selectHaikus = (state) => state.haikus;
