/** @format */

import FeaturedProduct from "@/components/FeaturedProducts";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { ProductModel } from "@/models/ProductsModel.js";

export default function HomePage({ feature_product, recent_products }) {
  return (
    <div>
      <Header />
      <FeaturedProduct product={feature_product} />
      <NewProducts newProducts={recent_products} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "65c24713f6d6759db88005a2";
  await mongooseConnect();
  const product = await ProductModel.findById(featuredProductId);
  const newProducts = await ProductModel.find({}, null, {
    sort: { _id: -1 },
  }).limit(10);
  return {
    props: {
      feature_product: JSON.parse(JSON.stringify(product)),
      recent_products: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
