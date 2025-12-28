"use client";

import { Section } from "@/components/ui/section";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RatingSelected } from "../ui/rating-selected";

const ratingOptions = [
  { stars: 5 },
  { stars: 4 },
  { stars: 3 },
  { stars: 2 },
  { stars: 1 },
];

export function FilterRating() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const rating = searchParams?.get("rating");

  const handleRating = (value: string) => {
    const queryParams = new URLSearchParams(searchParams?.toString());
    queryParams.set("rating", value);
    const path = `${pathname}?${queryParams.toString()}`;
    return router.push(path);
  };
  return (
    <Section>
      <p className="text-sm font-bold">Rating</p>
      <RatingSelected
        options={ratingOptions}
        value={rating ?? ""}
        handleRating={handleRating}
      />
    </Section>
  );
}
