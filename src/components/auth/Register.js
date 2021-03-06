import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "../../util/axios";
import "./authForm.scss";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";

// components
import ErrorMessage from "../errorMessage/ErrorMessage";
import Loader from "../loader/Loader";

// context
import ModelContext from "../../context/ModelContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { getUser, setUser } = useContext(UserContext);

  const {
    setShowModalContext,
    setShowModal,
    setShowDeleteModal,
    setEmailForModal,
  } = useContext(ModelContext);

  const history = useHistory();

  async function registerUser(e) {
    e.preventDefault();

    setIsLoading(true);

    const registeredUser = {
      email,
      password,
      passwordVerify,
    };

    try {
      const { data } = await axios.post(`${domain}/auth/`, registeredUser);
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
