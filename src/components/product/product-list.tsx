"use client";

import ProductCard from "./product-card";
import type { ProductWithMedia } from "@/server/api/product/product-schema";
import { use } from "react";

interface ProductListProps extends React.HTMLAttributes<HTMLElement> {
  initialProducts: Promise<ProductWithMedia[]>;
}

const ProductList = ({ initialProducts }: ProductListProps) => {
  const products = use(initialProducts);

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};

export default ProductList;
