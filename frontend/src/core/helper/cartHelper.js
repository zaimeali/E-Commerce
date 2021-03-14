export const addItemToCart = (item, count, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
      count: count,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  next();
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeItemFromCart = (productID) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (i === productID) {
        cart.splice(i, 1);
        // console.log(product);
        // console.log(i);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return cart;
};

export const cartEmpty = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
  }
};
