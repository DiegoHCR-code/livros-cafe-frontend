import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBooks } from './booksAPI';

export const fetchBooks = createAsyncThunk('books/fetchBooks', getBooks);

const booksSlice = createSlice({
  name: 'books',
  initialState: { items: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      });
  },
});

export default booksSlice.reducer;
