/** @format */

import styled from "styled-components";
import Center from "@/components/Center";
import ProductBox from "@/components/ProductBox";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 500;
  color: #f70000;
`;

export default function NewProducts({ newProducts }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      {/* <ProductsGrid products={newProducts} /> */}
      <ProductsGrid>
        {newProducts?.length > 0 &&
          newProducts.map((newProduct) => <ProductBox {...newProduct} />)}
      </ProductsGrid>
    </Center>
  );
}
