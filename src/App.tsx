import React, { useEffect } from "react";
import "./App.css";
import Profile from "./components/Profile";
import { Route, Routes } from "react-router-dom";

function App() {
  // TODO: log in user and store user token

  useEffect(() => {
    // TODO: store the current user id and their token
    localStorage.setItem("currentUser", "17");
  }, []);

  return (
    <div className="App">
      <img src="/logo.jpeg" alt="logo" style={{ width: 125, marginTop: 20 }} />

      <Routes>
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
