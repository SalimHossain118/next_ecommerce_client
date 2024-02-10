/** @format */

import { mongooseConnect } from "@/lib/mongoose";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { OrdersModel } from "@/models/OrderstModel";
import { buffer } from "micro";

const endpointSecret =
  "whsec_1cdea88c51a1b864dc3680bae2021c78ddbf82303300203882a0cfcdc7d0ed3c";

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      console.log("paid or not ?", paid);
      console.log("Webhook data:", data);

      if (orderId && paid) {
        console.log("Updating order:", orderId);
        try {
          OrdersModel.updateOne({ _id: orderId }, { $set: { paid: true } });
        } catch (updateError) {
          console.error("Error updating order:", updateError.message);
        }
      }

      console.log("Webhook data:", data);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).send("ok");
  res.status(200).send(data);
}

export const config = {
  api: { bodyParser: false },
};

//  Nextzensoft with account id acct_1OZHTqCqC7hmWGAW
