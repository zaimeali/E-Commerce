import React, { useState, useEffect } from "react";

// React Router
import { Link } from "react-router-dom";

// Helper Function
import {
  createProduct,
  getAllCategories,
  getProductById,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

// Components
import Base from "../core/Base";

const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: "",
    error: false,
    updatedProduct: "",
    redirect: false,
    formData: new FormData(),
  });

  const { productID } = match.params;

  const { user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    updatedProduct,
    photo,
    redirect,
    formData,
  } = values;

  const preLoad = (productID) => {
    getProductById(productID).then((data) => {
      console.log(data);
      if (data.errors) {
        setValues({
          ...values,
          error: data.errors,
        });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          form: new FormData(),
        });
      }
    });

    getAllCategories().then((data) => {
      if (data.errors) {
        setValues({
          ...values,
          error: data.errors,
        });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
      //   console.log(data);
    });
  };

  useEffect(() => {
    preLoad(productID);
    // console.log(values.categories);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({
      ...values,
      error: false,
      [name]: value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      error: false,
      loading: true,
    });

    updateProduct(user._id, token, productID, formData).then((data) => {
      console.log(data);
      if (data.errors) {
        setValues({
          ...values,
          error: data.errors,
          loading: false,
        });
      } else if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
        });
      } else {
        setValues({
          ...values,
          loading: false,
          error: false,
          name: "",
          photo: "",
          description: "",
          stock: "",
          price: "",
          category: "",
          updatedProduct: data.product.name,
        });
        setTimeout(() => {
          setValues({
            ...values,
            updatedProduct: "",
          });
          window.location.href = "/admin/dashboard";
        }, 2000);
      }
    });
  };

  const backButton = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-md btn-dark mb-3" to="/admin/dashboard">
          Go Back
        </Link>
      </div>
    );
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3 mx-5"
      style={{
        display: updatedProduct ? "block" : "none",
      }}
    >
      <h4>{updatedProduct} updated successfully</h4>
    </div>
  );

  const errorMessage = () => (
    <div
      className="alert alert-danger mt-3 mx-5"
      style={{
        display: error ? "block" : "none",
      }}
    >
      <h4>Error Occured: {error}</h4>
    </div>
  );

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
          value={category}
        >
          <option disabled value="DEFAULT">
            Select
          </option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button type="submit" onClick={onSubmit} className="btn btn-success mt-2">
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Update a Product"
      description="Edit T-Shirts for sell"
      className="container bg-info p-4"
    >
      {backButton()}
      {errorMessage()}
      {successMessage()}
      <div className="row bg-dark text-white rounded">
        <div className="col-8 offset-2">{createProductForm()}</div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
