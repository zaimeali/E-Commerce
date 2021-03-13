import React, { useState, useEffect } from "react";

// API
import { API } from "../backend";

// Styles
import "./../styles.css";

// Helper Function
import { getAllProducts } from "./helper/coreapicalls";

// Components
import Base from "./Base";
import { Card } from "./Card";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadProduct = () => {
    getAllProducts().then((data) => {
      if (data.errors) {
        setError(data.errors);
      } else if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
      // console.log(data);
    });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <Base title="Home Page">
      <div className="row text-center">
        <h1 className="text-white mb-3">All T-Shirts</h1>
        <div className="row">
          {products.map((product, index) => (
            <div key={product._id} className="col-4 mb-4">
              <Card product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
}
