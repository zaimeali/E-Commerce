import React from "react";

// React Router
import { Link, withRouter } from "react-router-dom";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#2ecc72",
    };
  } else {
    return {
      color: "#fff",
    };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link style={currentTab(history, "/")} to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/cart")}
            to="/cart"
            className="nav-link"
          >
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/user/dashboard")}
            to="/user/dashboard"
            className="nav-link"
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/admin/dashboard")}
            to="/admin/dashboard"
            className="nav-link"
          >
            A. Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/signup")}
            to="/signup"
            className="nav-link"
          >
            Signup
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/signin")}
            to="/signin"
            className="nav-link"
          >
            Signin
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/signout")}
            to="/signout"
            className="nav-link"
          >
            Signout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
