import React, { createContext, useState, useEffect } from "react";
import axios from "../util/axios";
import domain from "../util/domain";

const UserContext = createContext();

function UserContextProvider(props) {
  const [user, setUser] = useState(null);

  async function getUser() {
    try {
      const response = await axios.get(`${domain}/auth/loggedIn`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
