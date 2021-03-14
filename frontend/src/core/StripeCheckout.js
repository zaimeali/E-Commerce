import React, { useState, useEffect } from "react";

// React-Router
import { Link } from "react-router-dom";

// Helper Function
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";

// StripeCheckout
import StripeCheckoutButton from "react-stripe-checkout";

// API
import { API } from "../backend";

const StripeCheckout = ({
  products,
  reload = undefined,
  setReload = (f) => f,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: false,
    address: "",
  });

  const { user, token } = isAuthenticated() && isAuthenticated();

  const getFinalPrice = () => {
    let amount = 0;

    if (products !== undefined) {
      products.map((p) => {
        amount += p.price;
      });
    }

    return amount;
  };

  const makePayment = (token) => {
    const body = {
      products,
      token,
      totalAmount: getFinalPrice() * 100,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
        const { status } = res;
        if (status === 200) {
          cartEmpty();
          setReload(!reload);
        }
      })
      .catch((err) => console.error(err));
  };

  const showStripeButton = () => {
    return user ? (
      <StripeCheckoutButton
        token={makePayment}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
        amount={getFinalPrice() * 100}
        name="Buy T-Shirts"
        // shippingAddress
        // billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Sign In</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout Loaded</h3>
      <h4 className="text-white lead">Total Amount: {getFinalPrice()}</h4>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
