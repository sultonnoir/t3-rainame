"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Settings2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Section } from "@/components/ui/section";
import useFilter from "@/hooks/use-filter";
import { FilterPrice } from "./filter-price";
import { RatingSelected } from "../ui/rating-selected";

export function FilterMobile() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { filter, setFilterOpen, filterOpen, setFilterValue } = useFilter();

  console.log(filterOpen);

  const handleSubmit = () => {
    const queryParams = new URLSearchParams(searchParams?.toString());
    if (filter.min !== 0) {
      queryParams.delete("minPrice");
      queryParams.set("minPrice", String(filter.min));
    }
    if (filter.max !== 0) {
      queryParams.delete("maxPrice");
      queryParams.set("maxPrice", String(filter.max));
    }
    queryParams.set("discount", String(filter.discount));
    queryParams.set("rating", String(filter.rating));
    const path = `${pathname}?${queryParams.toString()}`;
    setFilterOpen();
    router.push(path);
  };

  const handleReset = () => {
    setFilterValue({
      min: 0,
      max: 0,
      discount: 0,
      rating: 0,
      subcategory: "",
    });
    const queryParams = new URLSearchParams(searchParams?.toString());
    queryParams.delete("minPrice");
    queryParams.delete("maxPrice");
    queryParams.delete("discount");
    queryParams.delete("rating");
    queryParams.delete("search");
    queryParams.delete("sortBy");
    const path = `${pathname}?${queryParams.toString()}`;
    setFilterOpen();
    router.replace(path);
  };

  return (
    <Drawer open={filterOpen} onOpenChange={setFilterOpen}>
      <DrawerTrigger asChild>
        <Button className="size-10 gap-2 lg:hidden" aria-label="filter product">
          <Settings2 className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="mx-auto max-w-md space-y-4 p-4">
          <FilterPrice />
          <FilterDiscount />
          <FilterRating />
        </div>
        <DrawerFooter className="mx-auto w-full max-w-md">
          <Button onClick={handleSubmit}>Submit</Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function FilterDiscount() {
  const discount = [
    {
      value: 20,
      label: "> 20% off",
    },
    {
      value: 30,
      label: "> 30% off",
    },
    {
      value: 40,
      label: "> 40% off",
    },
    {
      value: 50,
      label: "> 50% off",
    },
    {
      value: 60,
      label: "> 60% off",
    },
    {
      value: 80,
      label: "> 80% off",
    },
  ];

  const { filter, setFilterValue } = useFilter();

  const handleDiscount = (value: string) => {
    setFilterValue({ discount: Number(value) });
  };

  return (
    <Section>
      <p className="text-sm font-bold">Dicount</p>
      <div className="grid grid-cols-3 gap-2">
        {discount.map((item) => (
          <Button
            key={item.value}
            onClick={() => handleDiscount(item.value.toString())}
            variant={
              filter.discount && filter.discount === item.value
                ? "default"
                : "outline"
            }
          >
            {item.label}
          </Button>
        ))}
      </div>
    </Section>
  );
}

function FilterRating() {
  const ratingOptions = [
    { stars: 5 },
    { stars: 4 },
    { stars: 3 },
    { stars: 2 },
    { stars: 1 },
  ];
  const { filter, setFilterValue } = useFilter();

  const handleRating = (value: string) => {
    setFilterValue({ rating: Number(value) });
  };
  return (
    <Section>
      <p>Rating</p>
      <RatingSelected
        options={ratingOptions}
        value={String(filter.rating)}
        handleRating={handleRating}
      />
    </Section>
  );
}
