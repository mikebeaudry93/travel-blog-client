import React from "react";
import "./app.scss";

// components
import Router from "./Router";

// context
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <Router />
    </UserContextProvider>
  );
}

export default App;
