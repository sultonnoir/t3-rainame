import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props extends React.HTMLAttributes<HTMLElement> {
  length?: number;
}

const ProductSkeleton = ({ length = 6 }: Props) => {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <div
          className="bg-muted/20 flex flex-col space-y-3 rounded-2xl p-2"
          key={index}
        >
          <Skeleton className="h-[225px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-10" />
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductSkeleton;
