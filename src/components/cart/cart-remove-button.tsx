import { api } from "@/trpc/react";
import { XIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface Props {
  cartId: string;
}

const CartRemoveButton = ({ cartId }: Props) => {
  const utils = api.useUtils();
  const { mutate, isPending } = api.cart.removeItem.useMutation({
    onSuccess: () => {
      void utils.cart.getItems.invalidate();
      toast.success("Item removed from cart");
    },
  });
  return (
    <Button
      size="icon"
      variant="ghost"
      disabled={isPending}
      onClick={() => mutate({ cartId })}
    >
      <XIcon />
    </Button>
  );
};

export default CartRemoveButton;
