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
    onSuccess: () => {
      reset();
      toast.success("Product added to cart!");
      void utils.cart.getItems.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const addToCart = async () => {
    if (isLoading) return;

    setIsLoading(true);

    if (!sizes) {
      toast.error("Please select size first");
      setIsLoading(false);
      return;
    }

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
