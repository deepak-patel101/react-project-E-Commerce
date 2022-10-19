import React from "react";
import { useCartContext } from "../context/Cart_context";
import { Link } from "react-router-dom";
import { CartContent, PageHero } from "../components";

import styled from "styled-components";
// import { CartContent } from "d:/js/react tutorial and projects course/8 - e-commerce project/repo/react-course-comfy-store-project-recording-main/src/components";

const Cart = () => {
  const { cart } = useCartContext();
  if (cart.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>There is noting in your cart</h2>
          <Link to="/products" className="btn">
            shope now
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <main>
      <PageHero title="cart" />

      <Wrapper className="page">
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;
export default Cart;
