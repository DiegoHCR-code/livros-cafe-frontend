import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { fetchBooks, removeBook } from "../features/books/booksSlice";

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

export default function Admin() {
  const books = useSelector((state) => state.books.items);
  const dispatch = useDispatch();

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

      <AddButton onClick={() => alert("Criar livro ainda não implementado")}>
        + Novo Livro
      </AddButton>

      <BookList>
        {books.length === 0 && <p>Nenhum livro cadastrado.</p>}

        {books.map((book) => (
          <Card key={book.id}>
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
