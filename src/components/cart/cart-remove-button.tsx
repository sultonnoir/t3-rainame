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
    onMutate: async ({ cartId }) => {
      await utils.cart.getItems.cancel();

      const previousItems = utils.cart.getItems.getData();

      utils.cart.getItems.setData(undefined, (old) =>
        old?.filter((item) => item.id !== cartId),
      );

      return { previousItems };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previousItems) {
        utils.cart.getItems.setData(undefined, ctx.previousItems);
      }
    },
    onSettled: () => {
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
