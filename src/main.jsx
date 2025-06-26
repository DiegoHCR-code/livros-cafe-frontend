import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle.js";
import { store } from './store/index';
import { theme } from "./styles/theme.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
