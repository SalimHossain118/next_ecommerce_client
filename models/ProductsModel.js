/** @format */

import mongoose, { Schema, model, connection } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Corrected type here
    properties: { type: Object },
  },
  { timestamps: true }
);

let ProductModel;

try {
  // Check if the model already exists in the connection
  ProductModel = connection.model("Product2");
} catch {
  // If the model doesn't exist, create it
  ProductModel = model("Product2", ProductSchema);
}

export { ProductModel };
