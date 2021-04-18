import React from "react";
import "./app.scss";
import axios from "axios";

// components
import Router from "./Router";

// context
import { UserContextProvider } from "./context/UserContext";

axios.defaults.withCredentials = true;
const token = sessionStorage.getItem("token");
if (token) axios.defaults.headers.authorization = token;

function App() {
  return (
    <UserContextProvider>
      <Router />
    </UserContextProvider>
  );
}

export default App;
