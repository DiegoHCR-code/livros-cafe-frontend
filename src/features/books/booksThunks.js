import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/livros';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addBook = createAsyncThunk('books/addBook', async (book) => {
  const response = await axios.post(API_URL, book);
  return response.data;
});

export const removeBook = createAsyncThunk('books/removeBook', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});