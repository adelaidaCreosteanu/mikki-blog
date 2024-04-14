import React, { useEffect } from "react";
import "./App.css";
import Profile from "./components/Profile";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useAuth } from "./service/AuthProvider";

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
  const navigate = useNavigate();
  const { status } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") navigate("/login");
  }, [status]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <img src="/logo.png" alt="logo" style={{ width: 150, margin: 20 }} />

        <Routes>
          <Route path="/register" element={<div />} />
          <Route path="/login" element={<div />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
