import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Movie from "./components/Movie/Movie";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  const [user, setUser] = useState(null)

  function logout() {
    window.localStorage.removeItem("jwtToken");
    setUser(null);
  }

  useEffect(() => {
    const jwtToken = window.localStorage.getItem("jwtToken");
    //const navigate = useNavigate();
    if (jwtToken) {
      let decodedToken = jwtDecode(jwtToken);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        window.localStorage.removeItem("jwtToken");
        //navigate("/login");
      } else {
        setUser({
          email: decodedToken.email,
          username: decodedToken.username,
          isAuth: true,
        })
        //navigate("/movie");
      }
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Header user={user} logout={logout} />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/movie" element={<Movie />} />
          {/* <Route path="/movie" element={ <PrivateRoute><Movie /></PrivateRoute>} /> */}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
