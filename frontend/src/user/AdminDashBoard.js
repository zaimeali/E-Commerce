import React from "react";

// React Router
import { Link } from "react-router-dom";

// Helper Function
import { isAuthenticated } from "../auth/helper";

// Components
import Base from "../core/Base";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="text-center text-white py-1 px-2 bg-success mr-2 rounded">
              Name:
            </span>{" "}
            {name}
          </li>
          <li className="list-group-item">
            <span className="text-center text-white py-1 px-2 bg-success mr-2 rounded">
              Email:
            </span>{" "}
            {email}
          </li>
          <li className="list-group-item">
            <span className="text-center text-white py-1 px-2 bg-danger mr-2 rounded">
              Admin Area
            </span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Admin area"
      description="Manage all of your Products here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
