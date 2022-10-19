import React from "react";
import { useProductContext } from "../context/Product_Context";
import Error from "./Error";
import Loading from "./Loading";
import styled from "styled-components";
import Product from "./Product";

const FeatureProducts = () => {
  const {
    products_loading: loading,
    products_error: err,
    featured_products: featured,
  } = useProductContext();

  if (loading) {
    return <Loading />;
  }
  if (err) {
    return <Error errName="featuredError" />;
  }
  return (
    <Wrapper className="section">
      <div className="title">
        <h2>Feature products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {featured.slice(0, 3).map((product) => {
          return <Product key={product.id} {...product} fromFeProduct={true} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeatureProducts;
