export const getBooks = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "1984",
          author: "George Orwell",
          price: 42,
          category: "Ficção",
          image: "/assets/logo.png",
        },
        {
          id: 2,
          title: "O Hobbit",
          author: "J.R.R. Tolkien",
          price: 59,
          category: "Fantasia",
          image: "/assets/logo.png",
        },
        {
          id: 3,
          title: "Dom Casmurro",
          author: "Machado de Assis",
          price: 35,
          category: "Clássicos",
          image: "/assets/logo.png",
        },
      ]);
    }, 800);
  });
};
