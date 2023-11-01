export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  console.log("addtocart");
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //calculate the total price (add shipping price)
  //   console.log(state.shippingPrice);
  //   state.shippingPrice = addDecimals(
  //     state.cartItems.reduce((a, c) => a + c.shippingPrice * c.qty, 0)
  //   );

  state.totalPrice = state.itemsPrice;

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
