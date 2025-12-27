"use client";

import { useMemo } from "react";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { api } from "@/trpc/react";
import EmptyCart from "./cart-empty";
import CartSkeleton from "./cart-skeleton";
import CartCard from "./cart-card";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const CartSidebar = () => {
  const path = usePathname();
  const utils = api.useUtils();

  const { data, isLoading, isError } = api.cart.getItems.useQuery(undefined, {
    staleTime: 1000 * 10,
  });

  const items = useMemo(() => data ?? [], [data]);

  const { count, totalPrice, hasOutOfStock } = useMemo(() => {
    const count = items.reduce((a, i) => a + i.quantity, 0);
    const totalPrice = items.reduce(
      (a, i) => a + i.product.discountedPrice * i.quantity,
      0,
    );
    const hasOutOfStock = items.some((i) => i.quantity > i.product.stock);

    return { count, totalPrice, hasOutOfStock };
  }, [items]);

  const router = useRouter();
  const { isPending, mutate } = api.checkout.creat.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      router.push(`/checkout?session=${data}`);
    },
  });
  const handleCheckout = () => {
    mutate();
  };

  if (path.startsWith("/checkout")) {
    return null;
  }

  return (
    <Sheet
      onOpenChange={(open) => {
        if (open) {
          void utils.cart.getItems.invalidate();
        }
      }}
    >
      {/* ---------------- Trigger ---------------- */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full"
          aria-label="cart"
        >
          {/* Badge */}
          <div
            className={cn(
              "bg-primary text-primary-foreground absolute top-0 -right-1 flex size-5 items-center justify-center rounded-full text-xs",
              isLoading && "animate-pulse",
              {
                hidden: count === 0,
              },
            )}
          >
            {isLoading ? "" : count < 99 ? count : "99+"}
          </div>

          <ShoppingBag />
        </Button>
      </SheetTrigger>

      {/* ---------------- Content ---------------- */}
      <SheetContent showClose>
        <SheetHeader>
          <SheetTitle>Cart ({count})</SheetTitle>
          <SheetDescription>
            Review your items before checkout.
          </SheetDescription>
        </SheetHeader>

        {/* Body */}
        {isLoading && <CartSkeleton />}

        {!isLoading && isError && <EmptyCart />}

        {!isLoading && !isError && items.length === 0 && <EmptyCart />}

        {!isLoading && !isError && items.length > 0 && (
          <div className="flex-col space-y-4 overflow-auto pl-3">
            {items.map((item) => (
              <CartCard item={item} key={item.id} isAggregate={true} />
            ))}
          </div>
        )}

        {/* Footer */}
        <SheetFooter className="mt-auto gap-3">
          <div className="flex w-full items-center justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-semibold">${totalPrice.toFixed(2)}</span>
          </div>

          <Button
            className="w-full"
            disabled={items.length === 0 || hasOutOfStock || isPending}
            onClick={handleCheckout}
          >
            Checkout
          </Button>

          {hasOutOfStock && (
            <p className="text-destructive text-xs">
              Some items are out of stock. Please update your cart.
            </p>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
