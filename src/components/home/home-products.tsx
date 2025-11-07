import ProductSkeleton from "../product/product-skeleton";
import { Suspense, type FunctionComponent } from "react";
import { cn } from "@/lib/utils";
import ProductList from "../product/product-list";
import type { SortBy } from "@/server/api/routers/products/product-schema";
import { api } from "@/trpc/server";

interface HomeProductProps extends React.HTMLAttributes<HTMLElement> {
  name?: string;
  description?: string;
  sortBy?: SortBy;
}

const HomeProduct: FunctionComponent<HomeProductProps> = ({
  name,
  description,
  sortBy,
  className,
}) => {
  void api.product.getFilterProducts.prefetch({ sortBy, page: 1, limit: 4 });
  return (
    <section className={cn("py-12 md:py-16", className)} id="home-products">
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Suspense fallback={<ProductSkeleton length={6} />}>
            <ProductList sortBy={sortBy} />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default HomeProduct;
