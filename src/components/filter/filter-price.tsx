"use client";

import { Section } from "@/components/ui/section";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useFilter from "@/hooks/use-filter";
import { PriceInput } from "../ui/price-input";

export function FilterPrice() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { filter, setFilterValue } = useFilter();

  // Handle change for max price
  const handleMaxChange = (value: number) => {
    setFilterValue({ max: value });
    if (value <= filter.min) {
      setFilterValue({ min: 0 });
    }
  };

  // Handle change for min price
  const handleMinChange = (value: number) => {
    setFilterValue({ min: value });
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    const queryParams = new URLSearchParams(searchParams?.toString());

    // Menambahkan min dan max hanya jika nilainya bukan 0
    if (filter.min !== 0) {
      queryParams.delete("minPrice");
      queryParams.set("minPrice", String(filter.min));
    }
    if (filter.max !== 0) {
      queryParams.delete("maxPrice");
      queryParams.set("maxPrice", String(filter.max));
    }

    // Reset filter values after submit
    setFilterValue({ min: 0, max: 0 });

    const path = `${pathname}?${queryParams.toString()}`;
    router.push(path);
  };

  return (
    <Section className="space-y-3">
      <p className="text-sm font-bold">Price</p>
      <form onSubmit={handleSubmit} className="flex items-center gap-5">
        <PriceInput
          value={filter.min}
          onChange={handleMinChange}
          label="Min price"
        />
        <PriceInput
          value={filter.max}
          onChange={handleMaxChange}
          label="Max price"
        />
        {/* Optional: Add a submit button */}
        <button type="submit" className="sr-only hidden" />
      </form>
    </Section>
  );
}
