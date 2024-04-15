import { Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <img src="/logo.png" alt="logo" style={{ width: 150, margin: 20 }} />

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
