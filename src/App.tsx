import React, { useEffect } from "react";
import "./App.css";
import Profile from "./components/Profile";
import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0d47a1",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#a2d5f1",
    },
  },
});

function App() {
  // TODO: log in user and store user token

  useEffect(() => {
    // TODO: store the current user id and their token
    localStorage.setItem("currentUser", "17");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <img src="/logo.png" alt="logo" style={{ width: 150, margin: 20 }} />

        <Routes>
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
