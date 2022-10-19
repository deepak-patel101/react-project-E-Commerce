import React from "react";
import { useFilterContext } from "../context/Filter_context";
import GridView from "./GridView";
import ListView from "./ListView";
const ProductList = () => {
  const { filtered_products: products, Gride_View } = useFilterContext();
  if (products.length < 1) {
    return <h4>NO RESULT FOUND</h4>;
  }
  if (Gride_View) {
    return <GridView products={products} />;
  } else {
    return <ListView products={products} />;
  }
};

export default ProductList;
