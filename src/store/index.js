import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';
import cartReducer from '../features/cart/cartSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    cart: cartReducer,
    user: userReducer,
  },
});
