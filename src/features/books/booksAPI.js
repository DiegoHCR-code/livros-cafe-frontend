export const getBooks = async () => {
  // Simula delay e resposta
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "O Pequeno Príncipe",
          author: "Antoine de Saint-Exupéry",
          price: 39.90,
          image: "/assets/logo.png",
        },
        {
          id: 2,
          title: "1984",
          author: "George Orwell",
          price: 44.50,
          image: "/assets/logo.png",
        },
        {
          id: 3,
          title: "Dom Casmurro",
          author: "Machado de Assis",
          price: 35.00,
          image: "/assets/logo.png",
        },
      ]);
    }, 800);
  });
};