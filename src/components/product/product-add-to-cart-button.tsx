"use client";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import { useAddToCart } from "@/hooks/use-add-to-cart";

interface ProductAddToCartDialogProps {
  productId: string;
}

const ProductAddToCartDialog = ({ productId }: ProductAddToCartDialogProps) => {
  const { addToCart, isLoading } = useAddToCart(productId);

  const handleAddToCart = async () => {
    await addToCart();
  };

  return (
    <div className="flex gap-2">
      <Button
        className="h-auto w-full gap-2"
        disabled={isLoading}
        onClick={handleAddToCart}
      >
        <ShoppingBag />
        Add to cart
      </Button>
    </div>
  );
};

export default ProductAddToCartDialog;
