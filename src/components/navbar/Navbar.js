import React, { useContext } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { BsPeopleCircle } from "react-icons/bs";
import UserContext from "../../context/UserContext";

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  async function logOut() {
    sessionStorage.removeItem("token");
    setUser(null);
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
        user && (
          <div>
            <Link to="/posts">My Posts</Link>
            <button onClick={logOut}>Logout</button>
          </div>
        )
      )}
    </div>
  );
}

export default Navbar;
