import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";
function Header({ user }) {
  console.log(user)
  return (
    <div className="header-container">
      <div className="header-container-title">
        <h1>Noble Movie App</h1>
      </div>

      <div className="header-link">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-nav-link" : undefined
          }
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/sign-up"
          className={({ isActive }) =>
            isActive ? "active-nav-link" : undefined
          }
        >
          Sign up
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "active-nav-link" : undefined
          }
        >
          Login
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
