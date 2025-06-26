import styled from "styled-components";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../features/books/booksSlice";

const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;
const SectionTitle = styled.h2`
  margin-top: 2rem;
  color: ${({ theme }) => theme.primary};
`;
const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const BookCard = styled(Link)`
  background: white;
  border-radius: 6px;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  border-radius: 8px;
  max-height: 400px;
  object-fit: cover;
`;

const SeeMoreButton = styled(Link)`
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.accent};
  text-decoration: underline;
`;

export default function Home() {
  const books = useSelector((state) => state.books.items);
  const promoBooks = books.slice(0, 3); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const booksByCategory = books.reduce((acc, book) => {
    if (!acc[book.category]) acc[book.category] = [];
    acc[book.category].push(book);
    return acc;
  }, {});

  return (
    <Container>
      <h1>📚 Livros em Oferta</h1>
      <Slider {...sliderSettings}>
        {promoBooks.map((book) => (
          <div key={book.id}>
            <CarouselImage
              src={book.image || "/assets/livro1.jpg"}
              alt={book.title}
            />
          </div>
        ))}
      </Slider>

      {Object.entries(booksByCategory).map(([category, items]) => (
        <div key={category}>
          <SectionTitle>{category}</SectionTitle>
          <BookGrid>
            {items.slice(0, 4).map((book) => (
              <BookCard to={`/livro/${book.id}`} key={book.id}>
                <img
                  src={book.image}
                  alt={book.title}
                  style={{
                    width: "100%",
                    borderRadius: "6px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <strong>{book.title}</strong>
                <br />
                <small>por {book.author}</small>
                <br />
                <small>R$ {book.price.toFixed(2)}</small>
              </BookCard>
            ))}
          </BookGrid>
          <SeeMoreButton to={`/categoria/${category.toLowerCase()}`}>
            Ver mais livros de {category}
          </SeeMoreButton>
        </div>
      ))}
    </Container>
  );
}
