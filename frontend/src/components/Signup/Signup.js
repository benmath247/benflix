import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import UsernameHooks from "../hooks/UsernameHooks";
import EmailHooks from "../hooks/EmailHooks";
import PasswordHooks from "../hooks/PasswordHooks";
import UserAuthHook from "../hooks/UserAuthHook";
import { useNavigate } from "react-router-dom"
import './Signup.css'

function Signup() {
  UserAuthHook("/movie", "/signup")
  const [
    usernameInput,
    setUsernameInput,
    usernameError,
    setUsernameError,
    setUsernameOnBlur,
    setUsernameOnFocus,
  ] = UsernameHooks();

  const [
    emailInput,
    setEmailInput,
    emailError,
    setEmailError,
    setEmailOnBlur,
    setEmailOnFocus,
  ] = EmailHooks();

  const [
    passwordInput,
    setPasswordInput,
    passwordError,
    setPasswordError,
    setPasswordOnBlur,
    setPasswordOnFocus,
  ] = PasswordHooks();

  const navigate = useNavigate();

  async function apiSignUp(e) {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/api/user/create-user`, {
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
      });
      toast.success(`Please go sign in!`, {
        position: "top-center",
        color: "black",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setUsernameInput("");
      setUsernameError("")
      setEmailInput("");
      setEmailError("")
      setPasswordInput("");
      setPasswordError("")
      navigate('/login')
    } catch (e) {
      console.log(e.response);
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
    <form className="form-container" onSubmit={apiSignUp}>
      <div className="form-div">
        <h1 style={{color:"white"}}>Sign up</h1>

        <div className="form-input">
          <input
            type="text"
            placeholder="username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            onBlur={() => setUsernameOnBlur(true)}
            onFocus={() => setUsernameOnFocus(true)}
            required
          />

          <div>
            <span className={`${usernameError ? "form-error" : undefined}`}>
              {usernameError && usernameError}
            </span>
          </div>
        </div>

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
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onBlur={() => setPasswordOnBlur(true)}
            onFocus={() => setPasswordOnFocus(true)}
            required
          />

          <div>
            <span className={`${passwordError ? "form-error" : undefined}`}>
              {passwordError && passwordError}
            </span>
          </div>
        </div>

        <button style={{backgroundColor:"red"}}>Submit</button>
      </div>
    </form>
  );
}

export default Signup;
