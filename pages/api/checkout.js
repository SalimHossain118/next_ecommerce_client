/** @format */

import { mongooseConnect } from "@/lib/mongoose";
import { OrderstModel } from "@/models/OrderstModel";
import { ProductModel } from "@/models/ProductsModel";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function checkout_api(req, res) {
  if (req.method !== "POST") {
    return res.json({ message: "Invalid" });
  }

  const {
    name,
    phoneNo,
    email,
    street,
    city,
    pCode,
    conuntry,
    cartProducts,
    total,
  } = req.body;

  console.log("cartProducts:", cartProducts);

  // let totalProductPrice = 0;

  // cartProducts.forEach((element) => {
  //   totalProductPrice += element.price_data.unit_amount * element.quantity;
  // });

  await mongooseConnect();
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];

  const productsInfos = await ProductModel.find({ _id: { $in: uniqueIds } });

  console.log("uniqueIds:", uniqueIds);
  console.log("productsInfos:", productsInfos);
  // console.log("total:", totalProductPrice);

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  // res.json({ line_items });
  const ordersDoc = await OrderstModel.create({
    line_items,
    name,
    phoneNo,
    email,
    street,
    city,
    pCode,
    conuntry,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: ordersDoc._id.toString() },
  });

  res.json({ url: session.url });
}
