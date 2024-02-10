/** @format */

import styled from "styled-components";
import Button from "@/components/Button";
import Link from "next/link";
import { useContext } from "react";
import CartIcon from "./icons/CartIcon";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div``;

const DisplayBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 120px;
  }
`;

const TitleBox = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;
const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const url = "/products/" + _id;
  const { addProductsFunction } = useContext(CartContext);

  return (
    <ProductWrapper>
      <DisplayBox href={url}>
        <img src={images[0]} alt="Images" />
      </DisplayBox>

      <ProductInfoBox>
        <TitleBox href={url}> {title}</TitleBox>
        <PriceRow>
          <Price>${price}</Price>
          <Button
            block
            onClick={() => addProductsFunction(_id)}
            primary
            outline>
            <CartIcon />
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
