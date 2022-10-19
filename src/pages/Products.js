import React from "react";
import { useProductContext } from "../context/Product_Context";
import styled from "styled-components";
import {
  Filters,
  Loading,
  Error,
  ProductList,
  Sort,
  PageHero,
} from "../components";

const ProductsPage = () => {
  const {
    products_loading: loading,
    products_error: err,
    featured_products: featured,
  } = useProductContext();

  if (loading) {
    return <Loading />;
  }
  if (err) {
    return <Error errName="single_product_error" />;
  }
  return (
    <main>
      <PageHero title="products" />
      <Wrapper className="page">
        <div className="section-center products">
          <Filters />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 488px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
