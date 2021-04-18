import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./authForm.scss";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";

// components
import ErrorMessage from "../errorMessage/ErrorMessage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { getUser } = useContext(UserContext);

  const history = useHistory();

  async function loginUser(e) {
    e.preventDefault();

    const loginUser = {
      email,
      password,
    };

    try {
      await axios.post(`${domain}/auth/login`, loginUser);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }

    await getUser();

    history.push("/");
  }

  return (
    <div className="auth-form">
      <h1>Log in to an existing user</h1>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form onSubmit={loginUser}>
        <div className="input-container">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="fake placeholder"
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="input-container">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="fake placeholder"
          />
          <label htmlFor="password">Password</label>
        </div>

        <button className="btn-primary btn-form" type="submit">
          Log in
        </button>
        <p>
          Don't have an account? {""}
          <Link to="/register">Click here to register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
