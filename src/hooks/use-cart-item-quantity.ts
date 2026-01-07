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

  const mutation = api.cart.create.useMutation({
    onSuccess: () => {
      void utils.cart.getItems.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
      setQuantity(lastSyncedQuantity); // rollback optimistic UI
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
