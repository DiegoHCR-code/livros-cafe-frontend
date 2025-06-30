import axios from "axios";

const API_URL = "http://localhost:5001/api/livros";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzUwOTYzNjQ3LCJleHAiOjE3NTE1Njg0NDd9.ziAgKW8RDAmwMY4MxfPF80X1SMvHaPagmdAjUkjFA1Y";

const livrosMock = [
  {
    title: 'O Poder do Hábito',
    author: 'Charles Duhigg',
    price: 39.9,
    quantidade: 20,
    category: 'Autoajuda',
    image: 'https://m.media-amazon.com/images/I/41awG44bS1L._SY445_SX342_.jpg',
  },
  {
    title: '1984',
    author: 'George Orwell',
    price: 29.9,
    quantidade: 20,
    category: 'Ficção',
    image: 'https://m.media-amazon.com/images/I/41AX0Dpu4fL._SY445_SX342_.jpg',
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    price: 59.9,
    quantidade: 20,
    category: 'Programação',
    image: 'https://m.media-amazon.com/images/I/41xShlnTZTL._SY445_SX342_.jpg',
  },
  {
    title: 'Pai Rico, Pai Pobre',
    author: 'Robert Kiyosaki',
    price: 34.9,
    quantidade: 20,
    category: 'Finanças',
    image: 'https://m.media-amazon.com/images/I/51AHZGhzZEL._SY445_SX342_.jpg',
  },
  {
    title: 'A Menina que Roubava Livros',
    author: 'Markus Zusak',
    price: 32.9,
    quantidade: 20,
    category: 'Romance',
    image: 'https://m.media-amazon.com/images/I/51sYXZ++78L._SY445_SX342_.jpg',
  },
  {
    title: 'A Sutil Arte de Ligar o F*da-se',
    author: 'Mark Manson',
    price: 36.9,
    quantidade: 20,
    category: 'Autoajuda',
    image: 'https://m.media-amazon.com/images/I/41H0Wz2-YsL._SY445_SX342_.jpg',
  },
  {
    title: 'O Código Da Vinci',
    author: 'Dan Brown',
    price: 27.5,
    quantidade: 20,
    category: 'Suspense',
    image: 'https://m.media-amazon.com/images/I/41tYGLxJ7lL._SY445_SX342_.jpg',
  },
  {
    title: 'O Alquimista',
    author: 'Paulo Coelho',
    price: 28.0,
    quantidade: 20,
    category: 'Filosofia',
    image: 'https://m.media-amazon.com/images/I/41Rm7Nj8oNL._SY445_SX342_.jpg',
  },
  {
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    price: 19.9,
    quantidade: 20,
    category: 'Clássico',
    image: 'https://m.media-amazon.com/images/I/41NLFSlpGwL._SY445_SX342_.jpg',
  },
  {
    title: 'O Hobbit',
    author: 'J.R.R. Tolkien',
    price: 42.5,
    quantidade: 20,
    category: 'Fantasia',
    image: 'https://m.media-amazon.com/images/I/51r6P--JzAL._SY445_SX342_.jpg',
  },
];

async function seedLivros() {
  for (const livro of livrosMock) {
    try {
      const res = await axios.post(API_URL, livro, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("✅ Livro criado:", res.data.title);
    } catch (err) {
      console.error("❌ Erro ao criar livro:", livro.title);
      if (err.response) {
        console.error("↪ Status:", err.response.status);
        console.error("↪ Data:", err.response.data); // Veja a mensagem do backend
      } else {
        console.error("↪ Erro:", err.message);
      }
    }
  }
}

seedLivros();
