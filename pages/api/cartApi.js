/** @format */

import { mongooseConnect } from "@/lib/mongoose";
import { ProductModel } from "@/models/ProductsModel";

export default async function handle(req, res) {
  await mongooseConnect();
  const ids = req.body.ids;
  res.json(await ProductModel.find({ _id: ids }));
}
