import React, { useContext } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { BsPeopleCircle } from "react-icons/bs";
import UserContext from "../../context/UserContext";
import axios from "axios";

function Navbar() {
  const { user, getUser } = useContext(UserContext);

  async function logOut() {
    await axios.get("http://localhost:5000/auth/logOut");

    await getUser();
  }

  return (
    <div className="navbar">
      <Link to="/">
        <h1>Travel Logger</h1>
      </Link>

      {user === null ? (
        <div className="log-register">
          <div className="login-box">
            <BsPeopleCircle size="1rem" />
            <Link to="/login">Login</Link>
          </div>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        user && <button onClick={logOut}>Logout</button>
      )}
    </div>
  );
}

export default Navbar;
