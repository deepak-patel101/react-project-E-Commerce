import React from "react";
import PageHero from "../components/PageHero";
import styled from "styled-components";
import { useCartContext } from "../context/Cart_context";
import { Link } from "react-router-dom";
import RazerPayCheckout from "../components/RazerPayCheckout";

const Checkout = () => {
  const { cart } = useCartContext();
  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        {cart.length < 1 ? (
          <div className="empty">
            <h2>Your cart is empty</h2>
            <Link to="/products" className="btn">
              Shop now
            </Link>
          </div>
        ) : (
          <RazerPayCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default Checkout;
