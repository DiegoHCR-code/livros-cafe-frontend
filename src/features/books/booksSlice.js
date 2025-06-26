import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBooks } from "./booksAPI";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await getBooks();
  return response;
});

const booksSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    removeBook: (state, action) => {
      state.items = state.items.filter((book) => book.id !== action.payload);
    },
    addBook: (state, action) => {
      const newBook = {
        id: Date.now(),
        ...action.payload,
      };
      state.items.push(newBook);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { removeBook, addBook } = booksSlice.actions;
export default booksSlice.reducer;
