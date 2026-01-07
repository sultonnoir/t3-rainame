"use client";

import type { CartLists } from "@/server/api/cart/cart-schema";
import { useEffect, useState, type HtmlHTMLAttributes } from "react";
import Link from "next/link";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { Image } from "@unpic/react/nextjs";
import { blurhashToDataUri } from "@unpic/placeholder";
import NumberFlow from "@number-flow/react";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  item: CartLists;
  isAggregate: boolean;
}

const CartCard = ({ item, isAggregate, className }: Props) => {
  const maxAllowedAmount = item.product.stock;
  const utils = api.useUtils();

  /* ---------------- quantity state ---------------- */
  const [quantity, setQuantity] = useState(item.quantity);
  const debouncedQuantity = useDebounce(quantity, 500);

  /* ---------------- mutations ---------------- */
  const removeItem = api.cart.removeItem.useMutation({
    onSuccess: () => {
      void utils.cart.getItems.invalidate();
      toast.success("Item removed from cart");
    },
  });

  const updateQuantity = api.cart.updateItemQuantity.useMutation({
    onSuccess: () => {
      void utils.cart.getItems.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
      setQuantity(item.quantity); // rollback UI
    },
  });
  const increment = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setQuantity((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
  };

  /* ---------------- side effect (debounce → mutation) ---------------- */
  const [lastUpdatedQuantity, setLastUpdatedQuantity] = useState(item.quantity);

  useEffect(() => {
    if (debouncedQuantity === lastUpdatedQuantity) return;
    if (debouncedQuantity < 1) return;
    if (debouncedQuantity > item.product.stock) return;

    updateQuantity.mutate({
      productId: item.product.id,
      quantity: debouncedQuantity,
      size: item.size,
    });

    setLastUpdatedQuantity(debouncedQuantity);
  }, [
    debouncedQuantity,
    item.product.id,
    item.product.stock,
    item.size,
    lastUpdatedQuantity,
    updateQuantity,
  ]);

  /* ---------------- derived state ---------------- */
  const isOutOfStock = quantity > item.product.stock;
  const isLowStock = item.product.stock <= 2;

  /* ---------------- render ---------------- */
  return (
    <div className={cn("flex max-w-xs gap-3", className)}>
      <Link href={`/products/${item.product.slug}`}>
        <Image
          src={item.product.media.url}
          alt={item.product.name}
          width={100}
          height={150}
          className="rounded-md"
          background={blurhashToDataUri(item.product.media.blur)}
        />
      </Link>

      <div className="flex grow flex-col gap-2">
        {/* title + remove */}
        <div className="flex items-center justify-between">
          <Link
            href={`/products/${item.product.slug}`}
            prefetch
            className="max-w-37.5 truncate font-bold"
          >
            {item.product.name}
          </Link>

          {isAggregate && (
            <Button
              size="icon"
              variant="ghost"
              disabled={removeItem.isPending}
              onClick={() => removeItem.mutate({ cartId: item.id })}
            >
              <XIcon />
            </Button>
          )}
        </div>

        {/* meta */}
        <div className="flex items-center justify-between text-sm">
          <p>Size: {item.size}</p>
          <p>Qty: {quantity}</p>
        </div>

        {/* stock warning */}
        {isLowStock && (
          <p className="text-destructive text-xs">
            Only {item.product.stock} left in stock
          </p>
        )}

        {isOutOfStock && (
          <p className="text-destructive text-xs">Quantity exceeds stock</p>
        )}

        {/* price */}
        <p className="font-semibold">
          ${(item.product.discountedPrice * quantity).toFixed(2)}
        </p>

        {/* quantity input */}
        {isAggregate && (
          <div className="bg-muted dark:bg-muted/50 mt-auto flex w-fit gap-3 rounded-lg p-1">
            <Button
              className="size-6 disabled:cursor-not-allowed"
              onClick={decrement}
              disabled={quantity === 1}
              variant="ghost"
              size="icon"
            >
              <MinusIcon className="size-4" />
            </Button>
            <NumberFlow
              value={quantity}
              format={{ useGrouping: false }}
              aria-hidden
              animated={true}
              className="pointer-events-none"
              willChange
            />
            <Button
              onClick={increment}
              className="size-6"
              disabled={quantity >= maxAllowedAmount}
              variant="ghost"
              size="icon"
            >
              <PlusIcon className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartCard;
