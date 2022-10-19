import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Error = ({ errName }) => {
  if (errName === "featuredError") {
    return (
      <div className="section section-center text-center">
        there was an error while getting featured products
      </div>
    );
  }
  if ((errName = "single_product_error")) {
    return (
      <Wrapper className="page-100">
        <section>
          <h1>404</h1>
          <h3>ERROR,while getting the product details</h3>
          <Link to="/" className="btn">
            back home
          </Link>
        </section>
      </Wrapper>
    );
  }

  return (
    <div className="section section-center text-center">there was an error</div>
  );
};

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`;

export default Error;
