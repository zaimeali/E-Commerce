import React, { useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Helper Function
import { signup } from "../auth/helper";

// Base Component
import Base from "./../core/Base";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    // Higher Order Function
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setValues({
      ...values,
      error: false,
    });

    signup({
      name,
      email,
      password,
    })
      .then((data) => {
        if (data.errors) {
          setValues({
            ...values,
            error: JSON.stringify(data.errors[0].msg),
            success: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.error("Error in signup"));
  };

  const SuccessMessage = () => (
    <div className="alert alert-success">
      <p>New account was created</p>
      <Link to="/signin">Login here</Link>
    </div>
  );

  const ErrorMessage = () => (
    <div className="alert alert-danger">
      <p>{error}</p>
    </div>
  );

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            {values.success && <SuccessMessage />}
            {values.error && <ErrorMessage />}
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
              />
            </div>

            <button
              onClick={onSubmit}
              className="btn btn-success btn-block w-100 mt-3"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up" description="A page for user to register">
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
