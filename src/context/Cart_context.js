import React, { useContext, useReducer, useEffect } from "react";
import reducer from "../reducers/Cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../action";
//chalking local storage
const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};
const initialState = {
  // cart: [],    kyu ki ab apn local storage bhi dekhenge
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 750,
};
const CartContext = React.createContext();
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addToCart = (id, mainColor, amount, product) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, mainColor, amount, product },
    });
  };

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);
  ////////////////// remove item form cart/////////////
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };
  ///////// toggleAmount ////////////////
  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };
  ////////// clear cart///////////
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  /////////
  return (
    <CartContext.Provider
      value={{ ...state, toggleAmount, addToCart, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCartContext = () => {
  return useContext(CartContext);
};
