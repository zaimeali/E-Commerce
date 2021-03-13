import React, { useState, useEffect } from "react";

// React Router
import { Redirect } from "react-router-dom";

// Components
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

export const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  index,
  reload = undefined,
  setReload = (f) => f,
}) => {
  const [redirect, setRedirect] = useState(false);

  const cardTitle = product ? product.name : "Photo from Pexel";
  const cardDescription = product ? product.description : "Default Description";
  const cardPrice = product ? product.price : "5";

  const addToCartFunction = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addToCartFunction}
          className="btn btn-block btn-outline-success mt-2 mb-2 d-block w-100"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart, i) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(i);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2 d-block w-100"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />

        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">
            {showRemoveFromCart(removeFromCart, index)}
          </div>
        </div>
      </div>
    </div>
  );
};
