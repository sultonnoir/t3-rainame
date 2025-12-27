"use client";

import type { CartLists } from "@/server/api/cart/cart-schema";
import { useEffect, useState } from "react";
import Link from "next/link";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import { Image } from "@unpic/react/nextjs";
import { blurhashToDataUri } from "@unpic/placeholder";

import { Button } from "../ui/button";
import QuantityInputBasic from "../ui/quantity-input-basic";
import { api } from "@/trpc/react";
import { useDebounce } from "@/hooks/use-debounce";

type Props = {
  item: CartLists;
  isAggregate: boolean;
};

const CartCard = ({ item, isAggregate }: Props) => {
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

  const updateQuantity = api.cart.create.useMutation({
    onSuccess: () => {
      void utils.cart.getItems.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
      setQuantity(item.quantity); // rollback UI
    },
  });

  /* ---------------- side effect (debounce → mutation) ---------------- */
  useEffect(() => {
    if (debouncedQuantity === item.quantity) return;
    if (debouncedQuantity < 1) return;
    if (debouncedQuantity > item.product.stock) return;

    updateQuantity.mutate({
      productId: item.product.id,
      quantity: debouncedQuantity,
    });
  }, [
    debouncedQuantity,
    item.id,
    item.quantity,
    item.product.stock,
    updateQuantity,
    item.product.id,
  ]);

  /* ---------------- derived state ---------------- */
  const isOutOfStock = quantity > item.product.stock;
  const isLowStock = item.product.stock <= 2;

  /* ---------------- render ---------------- */
  return (
    <div className="flex max-w-xs gap-3">
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

          <Button
            size="icon"
            variant="ghost"
            disabled={removeItem.isPending}
            onClick={() => removeItem.mutate({ cartId: item.id })}
          >
            <XIcon />
          </Button>
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
          <QuantityInputBasic
            quantity={quantity}
            min={1}
            max={item.product.stock}
            onChange={setQuantity}
            disabled={updateQuantity.isPending}
          />
        )}
      </div>
    </div>
  );
};

export default CartCard;
