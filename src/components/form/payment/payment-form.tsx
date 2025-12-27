"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { PaymentTypeSelector } from "./payment-type-selector";
import { CardDetailsFields } from "./card-details-fields";
import { Form } from "@/components/ui/form";
import { PaymentFormSchema } from "./schema";
import { cn } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import NumberFlow from "@number-flow/react";
import { AddressFormFields } from "./address-form-fields";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

interface Props {
  className?: string;
  subTotal: number;
  checkoutId: string;
}

export function PaymentForm({ className, subTotal, checkoutId }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const charge = subTotal >= 50 ? 0 : 10;
  const tax = (subTotal * 3) / 100;

  const total = subTotal + charge + tax;

  const form = useForm<PaymentFormSchema>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      paymentMethod: "credit",
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      email: "",
    },
  });
  const router = useRouter();
  const utils = api.useUtils();
  const { mutate } = api.checkout.paid.useMutation({
    onSuccess: () => {
      toast.success("Check your email for more information");
      void utils.cart.getItems.invalidate();
      // Tunggu 3 detik sebelum redirect
      setTimeout(() => {
        router.push("/");
      }, 3000); // 3000 ms = 3 detik
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  async function onSubmit() {
    mutate({
      checkoutId,
    });
  }

  return (
    <Card
      ref={ref}
      id="payment-form"
      className={cn(
        "top-32 w-full space-y-3 rounded-2xl border bg-white p-6 sm:sticky dark:bg-[#0a0a0a]",
        className,
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Address</h2>
            <p className="text-muted-foreground text-sm">
              Add address for shipping
            </p>
          </div>
          <AddressFormFields control={form.control} />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Payment Method
            </h2>
            <p className="text-muted-foreground text-sm">
              Add a new payment method to your account
            </p>
          </div>
          <PaymentTypeSelector control={form.control} />
          <CardDetailsFields control={form.control} />
        </form>
      </Form>
      <div className="mt-2 space-y-2">
        <div className="flex items-center justify-between">
          <p>Subtotal :</p>
          <NumberFlow
            value={subTotal}
            aria-hidden
            animated={true}
            className="text-fluid-xl text-foreground ~text-sm/base font-semibold"
            format={{ style: "currency", currency: "USD" }}
            willChange
          />
        </div>
        <div className="flex items-center justify-between">
          <p>Shiping Charge:</p>
          <p>{charge === 0 ? "-" : `$${charge}`}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Estimated Tax (3%) : </p>
          <NumberFlow
            value={tax}
            aria-hidden
            animated={true}
            className="text-fluid-xl text-foreground ~text-sm/base font-semibold"
            format={{ style: "currency", currency: "USD" }}
            willChange
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <p className="font-bold">Total :</p>
          <NumberFlow
            value={total}
            aria-hidden
            animated={true}
            className="text-foreground ~text-sm/2xl font-semibold"
            format={{ style: "currency", currency: "USD" }}
            willChange
          />
        </div>
      </div>
      <Button
        disabled={form.formState.isSubmitting}
        onClick={form.handleSubmit(onSubmit)}
        className="w-full"
      >
        Pay
      </Button>
    </Card>
  );
}
