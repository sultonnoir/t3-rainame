import { useState } from "react";
import { api } from "@/trpc/react";
import { useCount } from "@/hooks/use-count";
import { useSizes } from "@/hooks/use-size";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export function useAddToCart(productId: string) {
  const [isLoading, setIsLoading] = useState(false);

  const { data: user } = authClient.useSession();
  const { count, reset } = useCount();
  const { sizes } = useSizes();
  const utils = api.useUtils();

  const mutation = api.cart.create.useMutation({
    onMutate: async (input) => {
      await utils.cart.getItems.cancel();
      const previous = utils.cart.getItems.getData();

      utils.cart.getItems.setData(undefined, (old) => {
        if (!old) return old;

        const existing = old.find(
          (item) =>
            item.product.id === input.productId && item.size === input.size,
        );

        if (existing) {
          return old.map((item) =>
            item.id === existing.id
              ? { ...item, quantity: item.quantity + input.quantity }
              : item,
          );
        }

        return old;
      });

      return { previous };
    },

    onError: (_err, _input, ctx) => {
      if (ctx?.previous) {
        utils.cart.getItems.setData(undefined, ctx.previous);
      }
      toast.error("Failed to add product to cart");
    },

    onSuccess: () => {
      reset();
      toast.success("Product added to cart!");
    },

    onSettled: () => {
      setIsLoading(false);
      void utils.cart.getItems.invalidate();
    },
  });

  const addToCart = async () => {
    if (isLoading || mutation.isPending) return;

    if (!sizes) {
      toast.error("Please select size first");
      return;
    }

    if (!count || count <= 0) {
      toast.error("Invalid quantity");
      return;
    }

    setIsLoading(true);

    if (!user) {
      const { error } = await authClient.signIn.anonymous();
      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }
    }

    mutation.mutate({
      productId,
      size: sizes.name,
      quantity: count,
    });
  };

  return {
    addToCart,
    isLoading: isLoading || mutation.isPending,
  };
}
