// Dependencies: npm install @remixicon/react
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RiStarFill } from "@remixicon/react";

interface RatingOption {
  stars: number;
  count?: number;
}

interface RatingFilterProps {
  options: RatingOption[];
  value?: string;
  handleRating: (value: string) => void;
}

export function RatingSelected({
  options,
  value = "all",
  handleRating,
}: RatingFilterProps) {
  return (
    <RadioGroup value={value} onValueChange={handleRating}>
      {options.map((option) => (
        <div key={option.stars.toString()} className="flex items-center gap-2">
          <RadioGroupItem
            aria-label={`stars ${option.stars.toString()}`}
            value={option.stars.toString()}
            id={`radio-${option.stars.toString()}`}
          />
          <div
            className="inline-flex w-full cursor-pointer items-center gap-1"
            onClick={() => handleRating(String(option.stars))}
          >
            <p className="text-xs">{option.stars}</p>
            <Stars count={option.stars} />
            <span className="sr-only">{option.stars} stars</span>
            {option.count && (
              <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                ({option.count})
              </span>
            )}
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}

export function Stars({ count }: { count: number }) {
  return (
    <span
      className="inline-flex items-center text-amber-500"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <RiStarFill key={i} size={16} />
      ))}
    </span>
  );
}
