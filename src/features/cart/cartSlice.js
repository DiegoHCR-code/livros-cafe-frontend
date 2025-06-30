import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { id, title, price, quantity }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    adicionarAoCarrinho: (state, action) => {
      const livro = action.payload;
      const existente = state.items.find(item => item.id === livro.id);

      if (existente) {
        existente.quantity += 1;
      } else {
        state.items.push({ ...livro, quantity: 1 });
      }
    },
    removerDoCarrinho: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    alterarQuantidade: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
    limparCarrinho: (state) => {
      state.items = [];
    },
    finalizarCompra: (state) => {
      // Aqui você pode implementar um post para o backend no futuro
      state.items = [];
    }
  },
});

export const {
  adicionarAoCarrinho,
  removerDoCarrinho,
  alterarQuantidade,
  limparCarrinho,
  finalizarCompra
} = cartSlice.actions;

export const selectTotalItens = state =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPreco = state =>
  state.cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

export default cartSlice.reducer;
