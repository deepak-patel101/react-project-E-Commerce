import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductContext } from "../context/Product_Context";
import { single_product_url } from "../utils/constants";
import styled from "styled-components";
import {
  Loading,
  AddToCart,
  Error,
  ProductImages,
  PageHero,
  Stars,
} from "../components";
import { formatPrice } from "../utils/helpers";

const SingleProduct = () => {
  const { id } = useParams();
  const url = `${single_product_url}${id}`;

  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductContext();
  useEffect(() => {
    fetchSingleProduct(url);
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error errName="single_product_error" />;
  }
  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = product;

  return (
    <Wrapper>
      <PageHero title={name} product></PageHero>
      <div className="section section-center page">
        <Link to="/products" className="btn">
          Back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available :</span>
              {stock > 0 ? "in stock" : "out of stock"}
            </p>
            <p className="info">
              <span>Product ID :</span>
              {sku}
            </p>
            <p className="info">
              <span>Brand :</span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProduct;
