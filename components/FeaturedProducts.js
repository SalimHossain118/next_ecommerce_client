/** @format */

import Center from "./Center";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const BG = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const ProductTitle = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function FeaturedProduct({ product }) {
  const { addProductsFunction } = useContext(CartContext);

  function add_freature_product_to_cart() {
    addProductsFunction(product._id);
  }
  return (
    <BG>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <ProductTitle>{product.title}</ProductTitle>

              <Desc>{product.description}</Desc>

              <ButtonsWrapper>
                <ButtonLink
                  href={"/products/" + product._id}
                  outline={1}
                  white={1}
                  size="l">
                  Read More ..
                </ButtonLink>
                <Button onClick={add_freature_product_to_cart} primary size="l">
                  <CartIcon />
                  Add To Cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img
              src="https://bgr.com/wp-content/uploads/2021/08/macbook-air.jpg?quality=82&strip=all&w=1020&h=574&crop=1"
              alt=""
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </BG>
  );
}
