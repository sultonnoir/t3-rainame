"use client";
import { use } from "react";
import type { CheckoutPageProps } from "@/server/api/checkout/checkout-schema";
import CartCard from "../cart/cart-card";
import { PaymentForm } from "../form/payment/payment-form";

interface Props {
  initialData: Promise<CheckoutPageProps>;
}

const CheckoutPage = ({ initialData }: Props) => {
  const checkout = use(initialData);

  return (
    <div className="container space-y-3">
      <div className="flex flex-col gap-5 pb-10 lg:flex-row lg:gap-10">
        <div className="basis-1/3 space-y-3 lg:min-h-screen">
          {checkout.checkoutItem.map((item) => (
            <CartCard
              key={item.id}
              isAggregate={false}
              item={item}
              className="w-full max-w-5xl rounded-md border p-3"
            />
          ))}
        </div>
        <div className="relative basis-2/3">
          <PaymentForm
            subTotal={checkout.totalPrice}
            checkoutId={checkout.id}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
