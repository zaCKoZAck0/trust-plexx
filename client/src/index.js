import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserProvider } from "./components/contexts/userContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF0000",
      light: "#AF0404",
      dark: "#AF0404",
      contrastText: "#fff",
    },
    secondary: {
      main: "#414141",
      light: "#414141",
      dark: "#000",
      contrastText: "#fff",
    },
    info: {
      main: "#fff",
      light: "#fff",
      dark: "#fff",
      contrastText: "#000",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
