import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchBooks, removeBook } from '../features/books/booksSlice';
import ModalLivro from '../components/ModalLivro';
import Header from '../components/Header';

const Background = styled.div`
  background-color: #1b0c0a;
  min-height: 100vh;
`;

const Panel = styled.div`
  background-color: #e3c39a;
  border: 1px solid #d9b99b;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  color: #1b0c0a;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  h2 {
    margin: 0;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #5c3820;
  }
`;

const ActionButton = styled.button`
  background-color: #7b4b2a;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #5c3820;
  }
`;

const BookList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const BookCard = styled.div`
  background-color: #f8edd4;
  border: 1px solid #d9b99b;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 6px rgba(0,0,0,0.1);

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }

  div.content {
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
    color: #1b0c0a;
  }

  p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    color: #1b0c0a;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #c0392b;
  font-size: 0.85rem;
  padding: 0.5rem;
  margin-top: auto;
  border-radius: 0 0 20px 20px;

  &:hover {
    background-color: #922b21;
  }
`;

export default function Admin() {
  const books = useSelector(state => state.books.items);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = id => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      dispatch(removeBook(id));
    }
  };

  return (
    <Background>
      <Header />

      <Panel>
        <PanelHeader>
          <div>
            <h2>Painel Administrativo</h2>
            <p>Gerencie os livros da loja</p>
          </div>
          <ActionButton onClick={() => setShowModal(true)}>
            + Novo Livro
          </ActionButton>
        </PanelHeader>

        {showModal && <ModalLivro onClose={() => setShowModal(false)} />}

        <BookList>
          {books.map(book => (
            <BookCard key={book.id}>
              <img src={book.image} alt={book.title} />
              <div className="content">
                <h3>{book.title}</h3>
                <p><strong>Autor:</strong> {book.author}</p>
                <p><strong>Preço:</strong> R$ {book.price.toFixed(2)}</p>
                <DeleteButton onClick={() => handleDelete(book.id)}>
                  Excluir
                </DeleteButton>
              </div>
            </BookCard>
          ))}
        </BookList>
      </Panel>
    </Background>
  );
}
