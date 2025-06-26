export const fakeAuthService = {
  register: async ({ name, email, password }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const _ = password; 
        resolve({ id: Date.now(), name, email, token: "fake-jwt-token" });
      }, 500);
    });
  },

  login: async ({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve({ id: 1, name: "Usuário", email, token: "fake-jwt-token" });
        } else {
          reject(new Error("Email e senha são obrigatórios"));
        }
      }, 500);
    });
  }
};
