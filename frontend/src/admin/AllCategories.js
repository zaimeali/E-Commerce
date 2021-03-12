import React, { useEffect, useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Helper Function
import { getAllCategories } from "./helper/adminapicall";

// Components
import Base from "../core/Base";

const AllCategories = () => {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => setAllCategories(data));
  }, []);

  const backButton = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
          Go Back
        </Link>
      </div>
    );
  };

  const categories = () => {
    return (
      <ul className="list-group mb-4">
        {allCategories.map((data) => (
          <li key={data._id} className="list-group-item">
            {data.name}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Base
      title="All Categories"
      description="See all categories"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-8 offset-2">
          {backButton()}
          {allCategories.length > 0 && categories()}
        </div>
      </div>
    </Base>
  );
};

export default AllCategories;
