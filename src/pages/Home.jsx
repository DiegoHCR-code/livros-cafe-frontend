import styled from 'styled-components';
import Slider from 'react-slick';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchBooks } from '../features/books/booksThunks';
import Header from '../components/Header';

const Background = styled.div`
  background-color: #1b0c0a;
  min-height: 100vh;
  padding-bottom: 2rem;
`;

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  margin: 2rem 0 1rem;
  color: #e3c39a;
  font-size: 1.8rem;
`;

const CarouselWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto 2rem;
  overflow: hidden;

  .slick-dots li button:before {
    color: #e3c39a;
  }
`;

const StyledSlider = styled(Slider)`
  /* apenas personaliza os dots */
  .slick-dots li button:before {
    color: #e3c39a;
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 30px;
  border: 1px solid #d9b99b;
`;

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
`;

const BookCard = styled(Link)`
  background-color: #f3e6d6ff;
  border: 1px solid #d9b99b;
  border-radius: 20px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 6px rgba(0,0,0,0.1);
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  color: #1b0c0a;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 0.75rem;
`;

const BookTitle = styled.strong`
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: #3f2412;
`;

const BookInfo = styled.small`
  display: block;
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #5c3820;
`;

const SeeMoreButton = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #7b4b2a;
  color: white;
  border-radius: 25px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5c3820;
  }
`;

export default function Home() {
  const dispatch = useDispatch();
  const books = useSelector(state => state.books.items);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const carouselImages = [
    '/assets/carousel1.jpg',
    '/assets/carousel2.jpg',
    '/assets/carousel3.jpg',
    '/assets/carousel4.jpg',
    '/assets/carousel5.png',
  ];

  const booksByCategory = books.reduce((acc, book) => {
    if (!acc[book.category]) acc[book.category] = [];
    acc[book.category].push(book);
    return acc;
  }, {});

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,      
    centerPadding: '0px',   
  };

  return (
    <Background>
      <Header />
      <Container>
        <SectionTitle style={{fontSize: "4rem", marginBottom: '3rem', textAlign: "center"}}>Livros em Oferta</SectionTitle>
        <CarouselWrapper>
          <StyledSlider {...sliderSettings}>
            {carouselImages.map((src, idx) => (
              <div key={idx}>
                <CarouselImage src={src} alt={`Slide ${idx + 1}`} />
              </div>
            ))}
          </StyledSlider>
        </CarouselWrapper>

        {Object.entries(booksByCategory).map(([category, items]) => (
          <div key={category}>
            <SectionTitle>{category}</SectionTitle>
            <BookGrid>
              {items.slice(0, 4).map(book => (
                <BookCard to={`/livro/${book.id}`} key={book.id}>
                  <BookImage src={book.image} alt={book.title} />
                  <BookTitle>{book.title}</BookTitle>
                  <BookInfo>por {book.author}</BookInfo>
                  <BookInfo style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    R$ {book.price.toFixed(2)}
                  </BookInfo>
                </BookCard>
              ))}
            </BookGrid>
            <SeeMoreButton to={`/categoria/${category.toLowerCase()}`}>
              Ver mais de {category}
            </SeeMoreButton>
          </div>
        ))}
      </Container>
    </Background>
  );
}
