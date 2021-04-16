import React from "react";
import "./app.scss";
import axios from "axios";

// components
import Router from "./Router";

// context
import { UserContextProvider } from "./context/UserContext";

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Router />
    </UserContextProvider>
  );
}

export default App;
