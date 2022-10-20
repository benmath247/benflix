import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserAuthHook from "../hooks/UserAuthHook";
import UsernameHooks from "../hooks/UsernameHooks";
import EmailHooks from "../hooks/EmailHooks";
import PasswordHooks from "../hooks/PasswordHooks";
import jwtDecode from "jwt-decode";

import { useNavigate } from "react-router-dom"

function Login({ setUser }) {
  const [
    emailInput,
    setEmailInput,
    emailError,
    setEmailOnBlur,
    setEmailOnFocus,
  ] = EmailHooks();

  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  UserAuthHook("/movie", "/login")

  async function apiLogin(e) {
    e.preventDefault();
    try {
      let payload = await axios.post(`http://localhost:3001/api/user/login`, {
        email: emailInput,
        password: password,
      });

      // console.log(payload);
      let jwtToken = payload.data.payload
      window.localStorage.setItem("jwtToken", jwtToken);
      // decoding JWT
      const decodedToken = jwtDecode(jwtToken)
      toast.success("Successful Login")
      setEmailInput("")
      setPassword("")
      setUser({
        email: decodedToken.email,
        username: decodedToken.username,
        isAuth: true
      })
      navigate("/movie")
    } catch (e) {
      if (e.response && e.response.data.message === "failure") {
        toast.error(`${e.response.data.payload[0]}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }

  return (
    <form className="form-container" onSubmit={apiLogin}>
      <div className="form-div">
        <h1>Login</h1>

        <div className="form-input">
          <input
            type="text"
            placeholder="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onBlur={() => setEmailOnBlur(true)}
            onFocus={() => setEmailOnFocus(true)}
            required
          />

          <div>
            <span className={`${emailError ? "form-error" : undefined}`}>
              {emailError && emailError}
            </span>
          </div>
        </div>

        <div className="form-input">
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button>Submit</button>
      </div>
    </form>
  );
}

export default Login;
