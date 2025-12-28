"use client";

import { useInViewOnce } from "@/hooks/useI-in-view-once";
import { api } from "@/trpc/react";
import ProductSkeleton from "./product-skeleton";
import ProductCard from "./product-card";
import { cn } from "@/lib/utils";
import type { ProductFilter } from "@/server/api/product/product-schema";

interface HomeProductProps extends React.HTMLAttributes<HTMLElement> {
  name?: string;
  description?: string;
  filter?: ProductFilter;
}

function ProductClientFetch({
  className,
  name,
  description,
  filter,
}: HomeProductProps) {
  const { ref, hasEntered } = useInViewOnce<HTMLDivElement>({
    rootMargin: "300px",
  });

  const { data, isLoading } = api.product.getHomeProducts.useQuery(
    {
      ...filter,
    },
    {
      enabled: hasEntered,
    },
  );

  return (
    <section
      className={cn("py-12 md:py-16", className)}
      id="home-products"
      ref={ref}
    >
      <div className={`container`}>
        <div className="mb-8 flex flex-col items-center text-center">
          <h2
            className={`font-display text-3xl leading-tight font-bold tracking-tight md:text-4xl`}
          >
            {name}
          </h2>
          <div className="bg-primary mt-2 h-1 w-12 rounded-full" />
          <p
            className={`text-muted-foreground mt-4 max-w-2xl text-center md:text-lg`}
          >
            {description}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {!hasEntered && (
            <ProductSkeleton length={8} /> // placeholder sebelum terlihat
          )}
          {hasEntered && isLoading && <ProductSkeleton length={8} />}
          {data && (
            <>
              {data.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
export default ProductClientFetch;
