"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import type { ProductVariant } from "generated/prisma";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Image } from "@unpic/react/nextjs";
import { ShoppingCart } from "lucide-react";

interface CartDialogProps {
  id: string;
  name: string;
  price: number;
  discountedPrice: number;
  discount: number;
  image: string;
  variants: ProductVariant[];
}

export default function CartDialog({
  variants,
  name,
  image,
  id,
  discount,
  discountedPrice,
  price,
}: CartDialogProps) {
  const { data: user } = authClient.useSession();
  const util = api.useUtils();
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const { isPending, mutate } = api.cart.create.useMutation({
    onError: (error) => {
      toast.error(error.message);
      return;
    },
    onSuccess: async () => {
      await util.cart.getItems.invalidate();
      toast.success("Product added to cart!");
      setOpen(false);
    },
  });

  const handleToggle = (value: string) => {
    setSelected(value);
    setDisable(false);
  };

  const handleAddToCart = async () => {
    if (!selected) return;

    if (!user) {
      const { error } = await authClient.signIn.anonymous();
      if (error) {
        toast.error(error.message);
        return;
      }
    }

    mutate({
      size: selected,
      productId: id,
      quantity: 1,
    });
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button className="grow">
          <ShoppingCart />
          <span className="max-[324px]:hidden">Add to cart</span>
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Select size</ModalTitle>
          <ModalDescription>
            Please choose your size before adding this item to the cart.
          </ModalDescription>
        </ModalHeader>
        <ModalBody className="p-0">
          <div className="flex flex-row justify-between gap-4">
            <div className="flex flex-row gap-4">
              <Image
                src={image}
                alt={name}
                width={100}
                height={150}
                className="rounded-lg object-cover"
              />
              <div className="flex flex-col gap-2">
                <h2 className="max-w-25 truncate font-semibold text-nowrap">
                  {name}
                </h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold sm:text-xl">
                    ${discountedPrice}
                  </span>
                  {discount > 0 && (
                    <span className="text-muted-foreground text-sm line-through">
                      ${price}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold">Size</h3>
              <ToggleGroup
                type="single"
                spacing={2}
                variant="outline"
                size="lg"
                onValueChange={handleToggle}
              >
                {variants?.map((size) => (
                  <ToggleGroupItem
                    key={size.name}
                    value={size.name}
                    disabled={size.amount === 0}
                  >
                    {size.name}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleAddToCart} disabled={isPending || disable}>
            {isPending ? "Adding..." : "Add to Cart"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
