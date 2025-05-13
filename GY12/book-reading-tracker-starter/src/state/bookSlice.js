import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  books: [
    {
      id: 1,
      title: "Bűn és bűnhődés",
      author: "F. M. Dosztojevszkij",
      isRead: true,
    },
  ],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: {
      reducer: (state, { payload }) => {
        state.books.push(payload);
      },
      prepare: ({ title, author }) => {
        return {
          payload: {
            id: nanoid(),
            title,
            author,
            isRead: false,
          },
        };
      },
    },
    toggleReadState: (state, { payload: id }) => {
      const book = state.books.find((book) => book.id === id);
      if (book) {
        book.isRead = !book.isRead;
      }
    },
    removeBook: (state, { payload: id }) => {
      state.books = state.books.filter((book) => book.id !== id);
    },
  },
});

// reducer
export const bookReducer = bookSlice.reducer;

// actions
export const { addBook, toggleReadState, removeBook } = bookSlice.actions;

// selectors
export const selectAllBooks = (state) => state.book.books;

export const selectBooksByStatus = (state, status) => {
  const allBooks = state.book.books;

  if (status === "read") return allBooks.filter((book) => book.isRead);
  if (status === "unread") return allBooks.filter((book) => !book.isRead);

  return allBooks;
};
