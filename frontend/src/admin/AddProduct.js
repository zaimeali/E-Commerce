import React, { useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Components
import Base from "../core/Base";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const { name, description, price, stock } = values;

  const handleChange = (name) => (event) => {};
  const onSubmit = () => {};

  const backButton = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-md btn-dark mb-3" to="/admin/dashboard">
          Go Back
        </Link>
      </div>
    );
  };

  const createProductForm = () => (
    <form className="py-4">
      <span>Post photo</span>
      <div className="form-group my-3">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group my-3">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group my-3">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          <option value="a">a</option>
          <option value="b">b</option>
        </select>
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button type="submit" onClick={onSubmit} className="btn btn-success mt-2">
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Create a Product"
      description="Add new T-Shirts for sell"
      className="container bg-info p-4"
    >
      {backButton()}
      <div className="row bg-dark text-white rounded">
        <div className="col-8 offset-2">{createProductForm()}</div>
      </div>
    </Base>
  );
};

export default AddProduct;
