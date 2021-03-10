import React, { useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Helper Function
import { signin, isAuthenticated, authenticate } from "../auth/helper";

// Base Component
import Base from "./../core/Base";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
    isRedirect: false,
  });

  const { email, password, error, success, loading, isRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      error: false,
      loading: true,
    });

    signin({
      email,
      password,
    })
      .then((data) => {
        if (data.errors) {
          setValues({
            ...values,
            error: JSON.stringify(data.errors[0].msg),
            loading: false,
          });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              isRedirect: true,
            });
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const ErrorMessage = () => (
    <div className="alert alert-danger">
      <p>{error}</p>
    </div>
  );

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            {values.error && <ErrorMessage />}
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                value={email}
                onChange={handleChange("email")}
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                value={password}
                onChange={handleChange("password")}
                type="password"
              />
            </div>

            <button
              onClick={onSubmit}
              className="btn btn-success btn-block w-100 mt-3"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In" description="A page for user to login">
      {signInForm()}
    </Base>
  );
};

export default Signin;
