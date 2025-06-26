import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../features/books/booksSlice';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background-color: #e3c39a;
  border: 1px solid #d9b99b;
  border-radius: 30px;
  padding: 2.5rem;
  width: 100%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  h3 {
    font-size: 2.5rem;
    text-align: center;
    color: #1b0c0a;
    margin-bottom: 1rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 3rem;
  color: #1b0c0a;
  cursor: pointer;

  &:hover {
    color: #5c3820;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 25px;
  margin: 10px 0;
  border: 1px solid #d9b99b;
  border-radius: 25px;
  background: #F8EDD4FF;
  color: #1b0c0a;

  &::placeholder {
    color: #1B0C0AFA;
    font-size: 1rem;
  }
`;

const SaveButton = styled.button`
  background-color: #7b4b2a;
  color: white;
  border: none;
  padding: 20px;
  width: 50%;
  margin-top: 1rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5c3820;
  }
`;

export default function ModalLivro({ onClose }) {
  const [form, setForm] = useState({
    image: '',
    title: '',
    author: '',
    category: '',
    price: '',
  });

  const dispatch = useDispatch();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addBook({ ...form, price: parseFloat(form.price) }));
    onClose();
  };

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h3>Novo Livro</h3>
        <form onSubmit={handleSubmit}>
          <Input
            name="image"
            placeholder="URL da imagem ou /assets/nome.jpg"
            value={form.image}
            onChange={handleChange}
          />
          <Input
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            required
          />
          <Input
            name="author"
            placeholder="Autor"
            value={form.author}
            onChange={handleChange}
            required
          />
          <Input
            name="category"
            placeholder="Categoria (ex: Romance, Fantasia)"
            value={form.category}
            onChange={handleChange}
            required
          />
          <Input
            name="price"
            type="number"
            step="0.01"
            placeholder="Preço"
            value={form.price}
            onChange={handleChange}
            required
          />
          <SaveButton type="submit">Salvar</SaveButton>
        </form>
      </ModalContainer>
    </Overlay>
  );
}
