import React, { useEffect } from "react";
import "./App.css";
import Profile from "./components/Profile";

function App() {
  // TODO: log in user and store user token

  useEffect(() => {
    // TODO: store the current user id and their token
    localStorage.setItem("currentUser", "17");
  }, []);

  return (
    <div className="App">
      <img src="logo.jpeg" alt="logo" style={{ width: 125, marginTop: 20 }} />

      <Profile userid={17}></Profile>
    </div>
  );
}

export default App;
