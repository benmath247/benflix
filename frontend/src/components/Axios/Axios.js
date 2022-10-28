import axios from "axios";
import jwtDecode from "jwt-decode";

const jwtToken = window.localStorage.getItem("jwtToken")

const AxiosAuth = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "" : "http://localhost:3001/",
  timeout: 5000,
})

if (jwtToken) {
  let decodedToken = jwtDecode(jwtToken);

  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    window.localStorage.removeItem("jwtToken");
  } else {
    AxiosAuth.defaults.headers.common["Authorization"] = "Bearer " + jwtToken
  };
}

export default AxiosAuth
