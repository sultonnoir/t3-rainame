"use client";

import { Button } from "./button";
import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { Image } from "@unpic/react/nextjs";
const product = {
  id: 1,
  name: "Product Name",
  imgae: "/hero-1.avif",
  size: ["S", "M", "L", "XL"],
};

export default function TestButton() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button>Open Modal</Button>
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
                src={product.imgae}
                alt={product.name}
                width={100}
                height={150}
                className="rounded-lg object-cover"
              />
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold sm:text-xl">
                    ${product.discountedPrice}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-muted-foreground text-sm line-through">
                      ${product.normalPrice}
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
              >
                {product.size.map((size) => (
                  <ToggleGroupItem key={size} value={size}>
                    {size}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalClose>Close</ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
