import { configureStore } from "@reduxjs/toolkit";
import { haikuReducer } from "./haikuSlice";

// const reducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case "CHANGE_TEXT":
//       return { ...state, editor: payload };
//     default:
//       return state;
//   }
// };

// export const changeText = createAction("haikus/changeText");
// export const addHaiku = createAction("haikus/addHaiku");

// const reducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(changeText, (state, { payload }) => {
//       state.editor = payload;
//     })
//     .addCase(addHaiku, (state, { payload }) => {
//       state.haikus.push(payload);
//     });
// });

export const store = configureStore({
  reducer: haikuReducer,
});
