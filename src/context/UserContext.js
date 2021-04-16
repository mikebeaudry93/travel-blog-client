import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import domain from "../util/domain";

const UserContext = createContext();

function UserContextProvider(props) {
  const [user, setUser] = useState(null);

  async function getUser() {
    try {
      const response = await axios.get(`${domain}/auth/loggedIn`);
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
