import React, { useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Base Component
import Base from "./../core/Base";

const Signin = () => {
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group">
              <label className="text-light">Email</label>
              <input className="form-control" type="email" />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input className="form-control" type="password" />
            </div>

            <button className="btn btn-success btn-block w-100 mt-3">
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
