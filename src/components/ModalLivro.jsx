import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../features/books/booksSlice";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 6px 0;
`;

const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 10px 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
`;

export default function ModalLivro({ onClose }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
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
            name="image"
            placeholder="URL da imagem ou /assets/nome.jpg"
            value={form.image}
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
