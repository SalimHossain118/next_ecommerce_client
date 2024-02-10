/** @format */
import mongoose from "mongoose";
const { Types } = mongoose;
import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import ProductBox from "@/components/ProductBox";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProductsFunction, removeProduct, clearCart } =
    useContext(CartContext);
  const [cart_products, set_cart_products] = useState([]);

  //  =>
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pCode, setPcode] = useState("");
  const [conuntry, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios
        .post("/api/cartApi", { ids: cartProducts })
        .then((response) => {
          set_cart_products(response.data);
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    } else {
      set_cart_products([]);
    }
  }, [cartProducts]);

  //=>

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  const addMoreQuantity = (id) => {
    addProductsFunction(id);
  };

  const subMoreQuantity = (id) => {
    removeProduct(id);
  };

  let total = 0;
  for (const productId of cartProducts) {
    const price = cart_products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  // const goToPayment = async () => {
  const goToPayment = async (event) => {
    event.preventDefault();

    const response = await axios.post("/api/checkout", {
      name,
      email,
      phoneNo,
      street,
      city,
      pCode,
      conuntry,
      cartProducts,
      total,
    });

    console.log(response.data);
    if (response.data.url) {
      console.log(response.data.url);
      window.location = response.data.url;
    }
  };

  // ==>

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}

            {cart_products.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Products</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart_products.map((cart_products) => (
                    <tr key={cart_products._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={cart_products.images[0]} alt="" />
                        </ProductImageBox>
                        {cart_products.title}:
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() => subMoreQuantity(cart_products._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter(
                              (id) => id === cart_products._id
                            ).length
                          }
                        </QuantityLabel>
                        <Button
                          onClick={() => addMoreQuantity(cart_products._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === cart_products._id)
                          .length * cart_products.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total Price</td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>

          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>

              <Input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Phone No"
                value={phoneNo}
                name="phoneNo"
                onChange={(ev) => setPhoneNo(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Street Address"
                value={street}
                name="street"
                onChange={(ev) => setStreet(ev.target.value)}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Post Code"
                  value={pCode}
                  name="pCode"
                  onChange={(ev) => setPcode(ev.target.value)}
                />
              </CityHolder>

              <Input
                type="text"
                placeholder="Country"
                value={conuntry}
                name="country"
                onChange={(ev) => setCountry(ev.target.value)}
              />
              <input
                type="hidden"
                name="cartProductshiden"
                value={cartProducts.join(",")}
              />
              <Button black="true" onClick={goToPayment}>
                Contenue to Payment
              </Button>

              <h6>{cart_products.price}</h6>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
