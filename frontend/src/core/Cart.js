import React, { useState, useEffect } from "react";

// Helper Function
import { loadCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper";

// React Router
import { Link } from "react-router-dom";

// Components
import Base from "./Base";
import { Card } from "./Card";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(1);

  const [reload, setReload] = useState(false);

  const { token } = isAuthenticated();

  const preLoad = () => {
    setCartItems(loadCart);
  };

  useEffect(() => {
    preLoad();
  }, [reload]);

  let cardClassName = "col-6 mb-3";
  if (cartItems !== undefined) {
    if (cartItems.length === 1) {
      cardClassName = "col-12";
    }
  }

  return (
    <Base title="Cart Page" description="All cart items and ready to checkout">
      <div className="row text-center">
        <div className="col-6">
          <h3 className="mb-4">Cart Items</h3>
          <div className="row">
            {cartItems !== undefined ? (
              cartItems.map((product, index) => (
                <div key={product._id} className={cardClassName}>
                  <Card
                    product={product}
                    addToCart={false}
                    removeFromCart={true}
                    index={index}
                    setReload={setReload}
                    reload={reload}
                    count={count}
                  />
                </div>
              ))
            ) : token !== undefined ? (
              <p>No Items in a Cart</p>
            ) : (
              <Link to="/signin">
                <button className="btn btn-danger">You need to sign in</button>
              </Link>
            )}
          </div>
        </div>
        <div className="col-6">
          <h3 className="mb-4">Checkout</h3>
          <StripeCheckout
            products={cartItems}
            reload={reload}
            setReload={setReload}
          />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
