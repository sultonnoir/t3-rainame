import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";

interface UseCartItemQuantityParams {
  productId: string;
  size: string;
  initialQuantity: number;
  stock: number;
}

export function useCartItemQuantity({
  productId,
  size,
  initialQuantity,
  stock,
}: UseCartItemQuantityParams) {
  const utils = api.useUtils();

  const [quantity, setQuantity] = useState(initialQuantity);
  const debouncedQuantity = useDebounce(quantity, 500);
  const [lastSyncedQuantity, setLastSyncedQuantity] = useState(initialQuantity);
  const mutation = api.cart.updateItemQuantity.useMutation({
    // ✅ OPTIMISTIC UPDATE
    onMutate: async (input) => {
      await utils.cart.getItems.cancel();
      const previous = utils.cart.getItems.getData();

      utils.cart.getItems.setData(undefined, (old) => {
        if (!old) return old;

        return old.map((item) =>
          item.product.id === input.productId && item.size === input.size
            ? { ...item, quantity: input.quantity }
            : item,
        );
      });

      return { previous };
    },

    onError: (_err, _input, ctx) => {
      if (ctx?.previous) {
        utils.cart.getItems.setData(undefined, ctx.previous);
      }
      toast.error("Failed to update quantity");
    },

    onSettled: () => {
      void utils.cart.getItems.invalidate();
    },
  });

  useEffect(() => {
    if (debouncedQuantity === lastSyncedQuantity) return;
    if (debouncedQuantity < 1) return;
    if (debouncedQuantity > stock) return;

    mutation.mutate({
      productId,
      size,
      quantity: debouncedQuantity,
    });

    setLastSyncedQuantity(debouncedQuantity);
  }, [debouncedQuantity, lastSyncedQuantity, productId, size, stock, mutation]);

  return {
    quantity,
    setQuantity,
    isPending: mutation.isPending,
    isOutOfStock: quantity > stock,
    isLowStock: stock <= 2,
  };
}
