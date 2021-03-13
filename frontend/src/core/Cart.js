import React, { useState, useEffect } from "react";

// Helper Function
import { loadCart } from "./helper/cartHelper";

// Components
import Base from "./Base";
import { Card } from "./Card";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const [reload, setReload] = useState(false);

  const preLoad = () => {
    setCartItems(loadCart);
  };

  useEffect(() => {
    preLoad();
  }, [reload]);

  return (
    <Base title="Cart Page" description="All cart items and ready to checkout">
      <div className="row text-center">
        <div className="col-6">
          <h3 className="mb-4">Cart Items</h3>
          <div className="row">
            {cartItems.map((product, index) => (
              <div key={product._id} className="col-6 mb-3">
                <Card
                  product={product}
                  addToCart={false}
                  removeFromCart={true}
                  index={index}
                  setReload={setReload}
                  reload={reload}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-6">
          <h3>Chrckout</h3>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
