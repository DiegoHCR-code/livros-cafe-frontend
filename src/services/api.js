export const API_BASE = 'http://localhost:5001/api';

export const fetchLivros = () =>
  fetch(`${API_BASE}/livros`).then(res => res.json());

export const criarLivro = (dados) =>
  fetch(`${API_BASE}/livros`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  }).then(res => res.json());
