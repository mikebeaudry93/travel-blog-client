import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./authForm.scss";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";

// components
import ErrorMessage from "../errorMessage/ErrorMessage";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { getUser } = useContext(UserContext);

  const history = useHistory();

  async function registerUser(e) {
    e.preventDefault();

    const registeredUser = {
      email,
      password,
      passwordVerify,
    };

    try {
      await axios.post(`${domain}/auth/`, registeredUser);
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
      <h1>Register a new account</h1>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form className="form" onSubmit={registerUser}>
        <div className="input-container">
          <input
            id="email"
            type="email"
            value={email}
            placeholder="fake placeholder"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="input-container">
          <input
            id="password"
            type="password"
            value={password}
            placeholder="fake placeholder"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="input-container">
          <input
            id="password-verify"
            type="password"
            value={passwordVerify}
            placeholder="fake placeholder"
            onChange={(e) => setPasswordVerify(e.target.value)}
          />
          <label htmlFor="password-verify">Confirm Password</label>
        </div>

        <button className="btn-primary btn-form" type="submit">
          Register
        </button>
        <p>
          Already have an account? <Link to="/login">Click here to login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
