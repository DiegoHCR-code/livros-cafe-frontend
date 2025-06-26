import { createSlice } from '@reduxjs/toolkit';
import { fetchBooks, addBook, removeBook } from './booksThunks';

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.items = state.items.filter(book => book.id !== action.payload);
      });
  },
});

export default booksSlice.reducer;