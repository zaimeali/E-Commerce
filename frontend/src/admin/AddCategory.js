import React, { useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Helper Function
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";

// Components
import Base from "../core/Base";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const {
    user: { _id },
    token,
  } = isAuthenticated();

  const handleChange = (event) => {
    setError(false);
    setSuccess(false);
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);

    createCategory(_id, token, {
      name,
    })
      .then((data) => {
        if (data.errors) {
          setError(true);
          setSuccess(false);
        } else {
          setSuccess(true);
          setName("");
          setError(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const backButton = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
          Go Back
        </Link>
      </div>
    );
  };

  const MyCategoryForm = () => (
    <form action="" className="mb-4">
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          autoFocus
          required
          value={name}
          onChange={handleChange}
          placeholder="For e.g: Summer"
          className="form-control my-3"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );

  const errorMessage = () => {
    if (error) {
      return (
        <h4 className="text-center text-danger">Failed to create category</h4>
      );
    }
  };

  const successMessage = () => {
    if (success) {
      return (
        <h4 className="text-center text-success">
          Category created successfully
        </h4>
      );
    }
  };

  return (
    <Base
      title="Create a Category"
      description="Add a new category for a t-shirts"
      className="container bg-info p-4"
    >
      {successMessage()}
      {errorMessage()}
      <div className="row bg-white rounded">
        <div className="col-8 offset-2">
          {backButton()}
          <MyCategoryForm />
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
