import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../../util/axios";
import "./authForm.scss";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";

// components
import ErrorMessage from "../errorMessage/ErrorMessage";
import Loader from "../loader/Loader";

// context
import ModelContext from "../../context/ModelContext";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { getUser, setUser } = useContext(UserContext);

  const {
    setShowModalContext,
    setShowModal,
    setShowDeleteModal,
    setEmailForModal,
  } = useContext(ModelContext);

  async function loginUser(e) {
    e.preventDefault();

    setIsLoading(true);

    const loginUser = {
      email,
      password,
    };

    try {
      const { data } = await axios.post(`${domain}/auth/login`, loginUser);
      sessionStorage.setItem("token", data.token);
      const user = await getUser();
      setEmailForModal(email);
      setShowDeleteModal(false);
      setIsLoading(false);
      setUser(user);
      setShowModalContext(true);
      setShowModal(true);
      setTimeout(() => {
        setShowModalContext(false);
        setShowModal(false);
      }, 4000);
      history.push("/");
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
          setIsLoading(false);
        }
      }
    }
  }

  return (
    <div className="auth-form">
      {isLoading && <Loader />}

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
