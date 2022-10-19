import React from "react";
import { useEffect } from "react";
import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../action";

const Filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => product.price);
    maxPrice = Math.max(...maxPrice); //spared isliye kyu ki array he

    return {
      ...state,
      all_products: [...action.payload], //taki jab filter ka use karne ke bad waps normal state me jana ho to kahi to data
      // store ho  ### aur ...action.payload me spared operator is liye taki all_products me product ka data copy ho naki eo reference kare action.payload ko
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, Gride_View: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, Gride_View: false };
  }
  if (action.type === UPDATE_SORT) {
    let { sort } = state;

    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { filtered_products, sort } = state;
    let tempProducts = [...filtered_products];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort(
        (item, nextItem) => item.price - nextItem.price
      );
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort(
        (item, nextItem) => nextItem.price - item.price
      );
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((item, nextItem) => {
        return item.name.localeCompare(nextItem.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((item, nextItem) => {
        return nextItem.name.localeCompare(item.name);
      });
    }
    return { ...state, filtered_products: tempProducts }; //just in case there is none of match and we don`t want so empty page or a error
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } }; //[name]:value  here [name] representing text (key) from filters and value updating its value (dynamic object update)
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, company, category, color, price, shipping, max_price } =
      state.filters;
    let tempProducts = [...all_products];
    // /////////
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    if (category !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.category === category;
      });
    }
    if (company !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.company === company;
      });
    }
    if (color !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((colo) => colo === color);
      });
    }
    if (price !== max_price) {
      tempProducts = tempProducts.filter((product) => {
        return product.price <= price;
      });
    }
    if (shipping) {
      tempProducts = tempProducts.filter((product) => {
        return product.shipping === true;
      });
    }

    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
};

export default Filter_reducer;
