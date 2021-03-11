import React, { useState } from "react";

// React Router
import { Link, Redirect } from "react-router-dom";

// Helper Function
import { signin, isAuthenticated, authenticate } from "../auth/helper";

// Base Component
import Base from "./../core/Base";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    isRedirect: false,
  });

  const { email, password, error, loading, isRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: "",
      [name]: event.target.value,
    });
  };

  const performRedirect = () => {
    if (isRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated().user) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading..</h2>
        </div>
      )
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
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
            error: data.errors[0].msg,
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
            {loadingMessage()}
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
      {performRedirect()}
      {/* <p className="text-center text-white">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signin;
