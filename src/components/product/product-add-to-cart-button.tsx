"use client";
import { api } from "@/trpc/react";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import { useCount } from "@/hooks/use-count";
import { useSizes } from "@/hooks/use-size";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

interface ProductAddToCartDialogProps {
  productId: string;
}

const ProductAddToCartDialog = ({ productId }: ProductAddToCartDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { data: user } = authClient.useSession();
  const { count, reset } = useCount();
  const { sizes } = useSizes();
  const utils = api.useUtils();
  const { mutate } = api.cart.create.useMutation({
    onSuccess: () => {
      reset();
      toast.success("Product added to cart!");
      void utils.cart.getItems.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddToCart = async () => {
    setLoading(true);
    if (!sizes) {
      toast.error("Please select size first");
      return;
    }

    if (!user) {
      const { error } = await authClient.signIn.anonymous();
      if (error) {
        toast.error(error.message);
        return;
      }
    }

    mutate({
      productId,
      size: sizes.name,
      quantity: count,
    });
    setLoading(false);
  };
  return (
    <div className="flex gap-2">
      <Button
        className="h-auto w-full gap-2"
        disabled={loading}
        onClick={handleAddToCart}
      >
        <ShoppingBag />
        Add to cart
      </Button>
    </div>
  );
};

export default ProductAddToCartDialog;
