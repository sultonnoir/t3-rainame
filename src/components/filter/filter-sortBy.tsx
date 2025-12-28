"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  RiFireLine,
  RiSortNumberAsc,
  RiSortNumberDesc,
  RiStarFill,
} from "@remixicon/react";
import { ChevronsUpDown, Repeat, Sparkles } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function FilterSortBy() {
  const [sort, setSort] = React.useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSort = (value: string) => {
    const queryParams = new URLSearchParams(searchParams?.toString());
    setSort(value);
    queryParams.set("sortBy", value);
    const path = `${pathname}?${queryParams.toString()}`;
    return router.push(path);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" role="combobox" className="size-10 lg:w-56">
          <Repeat className="size-6 rotate-90 lg:hidden" />
          <div className="hidden w-full lg:flex lg:items-center lg:justify-between">
            {sort
              ? sortOptions.find((s) => s.value === sort)?.label
              : "Sorting"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sorting</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
          {sortOptions.map((item) => (
            <DropdownMenuRadioItem
              key={item.value}
              value={item.value}
              className="gap-2"
            >
              {item.icon}
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const sortOptions = [
  {
    value: "hot-sale",
    label: "Hot sales",
    icon: <RiFireLine className="fill-red-500" />,
  },
  {
    value: "rating",
    label: "Most rating",
    icon: <RiStarFill className="text-amber-500" />,
  },
  {
    value: "new-arrival",
    label: "New Arrival",
    icon: <Sparkles className="text-amber-500" />,
  },
  {
    value: "price-low",
    label: "Lowest price to high",
    icon: <RiSortNumberAsc />,
  },
  {
    value: "price-high",
    label: "High price to low",
    icon: <RiSortNumberDesc />,
  },
] as const;
