import { cn } from "@/lib/utils";
import React from "react";
import { FilterInstalled } from "./filter-instaled";
import { FilterCategories } from "./filter-categories";
import { FilterPrice } from "./filter-price";
import { FilterRating } from "./filter-rating";
import { FilterDiscount } from "./filter-discount";

type FilterSidebarProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export const FilterSidebar = ({ className }: FilterSidebarProps) => {
  return (
    <aside
      className={cn("hidden w-80 shrink-0 flex-col gap-2 lg:flex", className)}
    >
      <FilterInstalled />
      <FilterCategories />
      <FilterPrice />
      <FilterDiscount />
      <FilterRating />
    </aside>
  );
};
