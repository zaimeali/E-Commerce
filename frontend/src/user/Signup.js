import React, { useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Base Component
import Base from "./../core/Base";

const Signup = () => {
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group">
              <label className="text-light">Name</label>
              <input className="form-control" type="text" />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input className="form-control" type="email" />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input className="form-control" type="password" />
            </div>

            <button className="btn btn-success btn-block w-100 mt-3">
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
    </Base>
  );
};

export default Signup;
