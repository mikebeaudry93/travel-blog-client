import React from "react";
import "./app.scss";

// components
import Router from "./Router";

// context
import { UserContextProvider } from "./context/UserContext";
import { ModelContextProvider } from "./context/ModelContext";

function App() {
  return (
    <ModelContextProvider>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </ModelContextProvider>
  );
}

export default App;
