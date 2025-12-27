import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SheetClose } from "../ui/sheet";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingCart />
        </EmptyMedia>
        <EmptyTitle>Your cart is empty</EmptyTitle>
        <EmptyDescription>
          Looks like you haven&apos;t made your choice yey...
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <SheetClose asChild>
            <Button size="sm" variant="outline">
              Close cart
            </Button>
          </SheetClose>
          <Button size="sm" asChild>
            <Link href="/collections">Continue shopping</Link>
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
