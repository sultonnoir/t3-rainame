import CheckoutPage from "@/components/checkout/checkout-page";
import CheckoutSkeleton from "@/components/checkout/checkout-skeleton";
import { auth } from "@/lib/auth";
import { api } from "@/trpc/server";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Checkout",
};

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) => {
  const checkoutId = (await searchParams).session;
  if (!checkoutId) {
    redirect("/");
  }
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  if (!user) {
    redirect("/");
  }

  const isActive = await api.checkout.validation({
    checkoutId,
  });

  if (!isActive) {
    redirect("/");
  }

  const initalData = api.checkout.getCheckout({
    checkoutId,
  });

  return (
    <>
      <Suspense fallback={<CheckoutSkeleton />}>
        <CheckoutPage initialData={initalData} />
      </Suspense>
    </>
  );
};

export default Page;
