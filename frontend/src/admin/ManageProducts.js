import React, { useState, useEffect } from "react";

// React Router
import { Link } from "react-router-dom";

// Helper Function
import { isAuthenticated } from "../auth/helper";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";

// Components
import Base from "../core/Base";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);

  const { user, token } = isAuthenticated();

  const preLoad = () => {
    getAllProducts().then((data) => {
      if (data.errors) {
        console.error(data.errors);
      } else if (data.error) {
        console.error(data.error);
      } else {
        setProducts(data);
        setProductCount(data.length);
      }
    });
    // console.log(products);
  };

  useEffect(() => {
    preLoad();
  }, []);

  const deleteThisProduct = (productID) => {
    deleteProduct(user._id, token, productID)
      .then((res) => {
        if (res.errors) {
          console.error(res.errors);
        } else if (res.error) {
          console.error(res.error);
        } else {
          preLoad();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Go Back to Admin Dashboard</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-4 border-success border-bottom pt-2 pb-4">
            Total {productCount} {productCount > 1 ? "products" : "product"}
          </h2>

          {productCount > 0 &&
            products.map((product) => (
              <div className="row text-center mb-2" key={product._id}>
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => deleteThisProduct(product._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
