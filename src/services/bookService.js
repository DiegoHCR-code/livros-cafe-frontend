import api from './api';

export const getBooks = () => api.get('/livros');
export const createBook = (data) => api.post('/livros', data);
export const deleteBook = (id) => api.delete(`/livros/${id}`);
