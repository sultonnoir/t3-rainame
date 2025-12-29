import { cn } from "@/lib/utils";
import React from "react";
import { FilterInstalled } from "./filter-instaled";
import { FilterCategories } from "./filter-categories";
import { FilterPrice } from "./filter-price";
import { FilterRating } from "./filter-rating";
import { FilterDiscount } from "./filter-discount";
import { api } from "@/trpc/react";
import { useMediaQuery } from "@/hooks/use-media-query";

type FilterSidebarProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export const FilterSidebar = ({ className }: FilterSidebarProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { data: categories } = api.category.getAll.useQuery(undefined, {
    enabled: isDesktop,
    staleTime: 1000 * 60 * 10, // 10 menit
    refetchOnWindowFocus: false,
  });
  return (
    <aside
      className={cn("hidden w-80 shrink-0 flex-col gap-2 lg:flex", className)}
    >
      <FilterInstalled />
      <FilterCategories categories={categories ?? []} />
      <FilterPrice />
      <FilterDiscount />
      <FilterRating />
    </aside>
  );
};
