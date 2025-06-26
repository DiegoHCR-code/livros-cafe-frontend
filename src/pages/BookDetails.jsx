import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;
`;

const BookImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export default function BookDetails() {
  const { id } = useParams();
  const book = useSelector(state =>
    state.books.items.find(b => b.id === parseInt(id))
  );

  if (!book) return <Container>Livro não encontrado.</Container>;

  return (
    <Container>
      {book.image && <BookImage src={book.image} alt={book.title} />}
      <h2>{book.title}</h2>
      <p><strong>Autor:</strong> {book.author}</p>
      <p><strong>Categoria:</strong> {book.category}</p>
      <p><strong>Preço:</strong> R$ {book.price.toFixed(2)}</p>
      <p><em>Descrição fictícia...</em></p>
    </Container>
  );
}
