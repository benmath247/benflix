import React from "react";
import { NavLink, Link } from "react-router-dom";

import "./Header.css";
function Header({ user, logout }) {
  const headerMessage = user ? `Welcome, ${user.username}!` : "Movie App"
  if (user == null) {
    return (
      <div className="header-container">
        <div className="header-container-title">
          <h1>{headerMessage}</h1>
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
  } else {
    return (
      <div className="header-container">
        <div className="header-container-title">
          <h1>{headerMessage}</h1>
        </div>

        <div className="header-link">
          <NavLink
            to="/movie"
            className={({ isActive }) =>
              isActive ? "active-nav-link" : undefined
            }
            end
          >
            Movie
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "active-nav-link" : undefined
            }
          >
            Profile
          </NavLink>
          <Link onClick={logout}
            to="/login"
            className={({ isActive }) =>
              isActive ? "active-nav-link" : undefined
            }
          >
            Logout
          </Link>
        </div>
      </div>
    )
  }
}

export default Header;
