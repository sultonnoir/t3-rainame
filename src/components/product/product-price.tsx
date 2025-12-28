import { cn } from "@/lib/utils";
import React, { type HTMLAttributes } from "react";
import { Badge } from "../ui/badge";

interface PriceProductProps extends HTMLAttributes<HTMLDivElement> {
  discount: number;
  price: number;
  priceAfterDiscount: number;
  priceClassName?: string;
  discountClassName?: string;
}

const ProductPrice = ({
  price,
  discount,
  className,
  priceClassName,
  discountClassName,
  priceAfterDiscount,
  ...props
}: PriceProductProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm lg:text-[16px]",
        className,
      )}
      {...props}
    >
      {discount > 0 && (
        <p
          className={cn(
            "text-muted-foreground font-medium line-through",
            discountClassName,
          )}
        >
          ${price}
        </p>
      )}
      <div className={cn("font-bold", priceClassName)}>
        ${priceAfterDiscount}
      </div>
      {discount > 0 && <Badge>-{discount.toFixed(0)}%</Badge>}
    </div>
  );
};

export default ProductPrice;
