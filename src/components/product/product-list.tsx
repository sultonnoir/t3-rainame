"use client";

import { api } from "@/trpc/react";
import ProductCard from "./product-card";
import type { SortBy } from "@/server/api/routers/products/product-schema";

interface ProductListProps extends React.HTMLAttributes<HTMLElement> {
  sortBy?: SortBy;
}

const ProductList = ({ sortBy }: ProductListProps) => {
  const [data] = api.product.getFilterProducts.useSuspenseQuery({
    sortBy,
    page: 1,
    limit: 4,
  });

  return (
    <>
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};

export default ProductList;
