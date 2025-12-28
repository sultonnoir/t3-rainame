import { FilterSortBy } from "./filter-sortBy";
import ProductCard from "../product/product-card";
import { PaginationWithLinks } from "../ui/pagination-with-links";
import { FilterMobile } from "./filter-mobile";
import type { SearchProductsClient } from "@/server/api/product/product-schema";
import { api } from "@/trpc/server";

export const FilterPage = async ({
  title,
  searchParams,
  params,
}: SearchProductsClient) => {
  const { discount, page, rating, minPrice, maxPrice } = searchParams;
  const { data, meta } = await api.product.getFilterProducts({
    ...searchParams,
    category: params?.category,
    subcategory: params?.subcategory,
    page: page ? Number(page) : undefined,
    discount: discount ? Number(discount) : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    rating: rating ? Number(rating) : undefined,
  });
  return (
    <div className="container space-y-2 py-5">
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
          {meta.fallback ? (
            <h1 className="inline-flex flex-col leading-normal capitalize">
              <span>
                No items found for <b>{title}</b>
              </span>
              <span>
                <b>You may be interested in:</b>
              </span>
            </h1>
          ) : (
            <h1 className="inline-flex gap-2 capitalize">
              <span>Search for</span>
              <b>{`" ${title} "`}</b>
              <span className="text-muted-foreground text-sm whitespace-nowrap md:text-sm lg:text-base">
                {meta.total} items
              </span>
            </h1>
          )}
          <div className="flex w-full items-end justify-end gap-2 lg:w-fit">
            <FilterSortBy />
            <div className="md:hidden">
              <FilterMobile />
            </div>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-4">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {!meta.fallback && (
          <PaginationWithLinks
            totalCount={meta.total}
            pageSize={meta.limit}
            page={meta.page}
          />
        )}
      </div>
    </div>
  );
};
