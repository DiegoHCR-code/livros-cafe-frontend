import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchBooks, removeBook } from "../features/books/booksThunks";
import ModalLivro from "../components/ModalLivro";
import EditBookModal from "../components/EditBookModal";
import Header from "../components/Header";

const Background = styled.div`
  background-color: #1b0c0a;
  min-height: 100vh;
`;

const Panel = styled.div`
  background-color: #f3e6d6ff;
  border: 1px solid #d9b99b;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  color: #351908;
  width: 95%;
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
    font-size: 3.5rem;
    font-family: fantasy;
  }

  p {
    margin: 0;
    font-size: 1.5rem;
    color: #5c3820;
  }
`;

const ActionButton = styled.button`
  background-color: #7b4b2a;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #5c3820;
  }
`;

const BookList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 2rem;
`;

const BookCard = styled.div`
  background-color: #f3e6d6ff;
  border: 1px solid #d9b99b;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  width: 100%;

  img {
    width: 100%;
    height: 600px;
    object-fit: cover;
  }

  .content {
    padding: 1rem 0 0 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin: 0 0 1rem;
    padding-left: 1rem;
    font-size: 1.8rem;
    color: #3f2412ff;
  }

  p {
    margin: 0.25rem 0;
    padding-left: 1rem;
    font-size: 0.9rem;
    color: #5c3820;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #e91a03ff;
  font-size: 1.1rem;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 0 0 20px 20px;

  &:hover {
    background-color: #ec3424ff;
  }
`;

export default function Admin() {
  const books = useSelector((state) => state.books.items);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [livroEditando, setLivroEditando] = useState(null);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este livro?")) {
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
          {books.map((book) => (
            <BookCard key={book.id}>
              <img src={book.image} alt={book.title} />
              <div className="content">
                <h3>{book.title}</h3>
                <p>
                  <strong>Autor:</strong> {book.author}
                </p>
                <p>
                  <strong>Preço:</strong> R${" "}
                  {Number(book.price || 0).toFixed(2)}
                </p>
                <p style={{ marginTop: "20px", opacity: 0.8 }}>
                  <strong>Qtd em estoque:</strong> {book.quantidade}
                </p>
                <ActionButton onClick={() => setLivroEditando(book)}>
                  Editar
                </ActionButton>
                <DeleteButton onClick={() => handleDelete(book.id)}>
                  Excluir
                </DeleteButton>
              </div>
            </BookCard>
          ))}
        </BookList>
      </Panel>

      {livroEditando && (
        <EditBookModal
          livro={livroEditando}
          onClose={() => setLivroEditando(null)}
          onSave={() => dispatch(fetchBooks())}
        />
      )}
    </Background>
  );
}
