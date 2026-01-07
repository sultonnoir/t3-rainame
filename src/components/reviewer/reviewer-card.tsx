"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { formatDate, formatDistanceToNowStrict } from "date-fns";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import ProductSkeleton from "../product/product-skeleton";
import { Image } from "@unpic/react";

export function fromNow(from: Date) {
  if (!(from instanceof Date)) {
    return "Invalid input: 'from' must be a Date object";
  }

  const currentDate = new Date();
  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(from, { addSuffix: true });
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, "MMM d");
    } else {
      return formatDate(from, "MMM d, yyyy");
    }
  }
}

const ReviewCards = ({ productId }: { productId: string }) => {
  const { ref, hasEntered } = useInViewOnce<HTMLDivElement>({
    rootMargin: "300px",
  });
  const { data, isLoading } = api.review.getByProductId.useQuery(
    {
      productId,
    },
    {
      enabled: hasEntered,
    },
  );
  return (
    <div className="order-2 mb-8 w-full lg:order-1" ref={ref}>
      <div className="grid w-full gap-1 divide-y md:grid-cols-1">
        {!hasEntered && (
          <ProductSkeleton length={8} /> // placeholder sebelum terlihat
        )}
        {hasEntered && isLoading && <ProductSkeleton length={8} />}
        {data && (
          <>
            {data.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between gap-5 py-4 first:pt-0 last:pb-0"
              >
                <Image
                  src={result.user?.image ?? "/avatar.png"}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="relative size-10 shrink-0 overflow-hidden rounded-full"
                />
                <div className="flex grow flex-col gap-1">
                  <p className="text-lg font-semibold">
                    {result.user?.name}
                    <span className="text-muted-foreground ml-2 text-sm">
                      {fromNow(new Date(result.createdAt))}
                    </span>
                  </p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={cn(
                          "size-4",
                          index < result.value
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted",
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{result.message}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewCards;
