import React, { Fragment } from "react";

// Helper Auth
import { isAuthenticated, signout } from "./../auth/helper/index";

// React Router
import { Link, withRouter } from "react-router-dom";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#2ecc72",
      cursor: "pointer",
    };
  } else {
    return {
      color: "#fff",
      cursor: "pointer",
    };
  }
};

const Menu = ({ history }) => {
  const { user } = isAuthenticated();

  console.log(isAuthenticated());

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

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/user/dashboard")}
              to="/user/dashboard"
              className="nav-link"
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/admin/dashboard")}
              to="/admin/dashboard"
              className="nav-link"
            >
              Admin Dashboard
            </Link>
          </li>
        )}

        {!user && (
          <Fragment>
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
          </Fragment>
        )}
        {user && (
          <li className="nav-item">
            <span
              style={currentTab(history, "/signout")}
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
