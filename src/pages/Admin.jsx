import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchBooks, removeBook } from "../features/books/booksSlice";
import ModalLivro from "../components/ModalLivro";

const Container = styled.div`
  padding: 2rem;
`;

const BookList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  background-color: #fff;
`;

const AddButton = styled.button`
  background-color: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  margin-bottom: 16px;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  margin-top: 8px;
`;

const Form = styled.form`
  margin: 1rem 0;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 6px 0;
`;

export default function Admin() {
  const books = useSelector((state) => state.books.items);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (confirm("Tem certeza que deseja excluir este livro?")) {
      dispatch(removeBook(id));
    }
  };

  return (
    <Container>
      <h2>Painel Administrativo</h2>
      <p>Gerencie os livros da loja</p>

      <AddButton onClick={() => setShowModal(true)}>+ Novo Livro</AddButton>

      {showModal && <ModalLivro onClose={() => setShowModal(false)} />}

      <BookList>
        {books.map((book) => (
          <Card key={book.id}>
            <img
              src={book.image}
              alt={book.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <h3>{book.title}</h3>
            <p>
              <strong>Autor:</strong> {book.author}
            </p>
            <p>
              <strong>Preço:</strong> R$ {book.price.toFixed(2)}
            </p>
            <DeleteButton onClick={() => handleDelete(book.id)}>
              Excluir
            </DeleteButton>
          </Card>
        ))}
      </BookList>
    </Container>
  );
}
