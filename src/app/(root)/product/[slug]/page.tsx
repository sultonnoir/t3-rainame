import ProductClientFetch from "@/components/product/product-client-fetch";
import ProductPage from "@/components/product/product-page";
import ReviewCards from "@/components/reviewer/reviewer-card";
import ReviewerStats from "@/components/reviewer/reviewer-stats";

import { api } from "@/trpc/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await api.product.getMetadata({ slug });

  if (!data) notFound();
  return {
    title: data.name,
  };
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const product = await api.product.getProductBySlug({ slug });
  if (!product) notFound();

  return (
    <div className="relative z-0 container my-10 min-h-screen space-y-4">
      <ProductPage product={product} />
      <div className="flex w-full flex-col gap-10 lg:flex-row">
        <div className="order-1 lg:order-2">
          <ReviewerStats
            overallRating={Number(product.ratingAverage.toFixed(1))}
            totalReviewCount={product.ratingCount}
            verifiedPurchases={product.selling}
          />
        </div>

        <ReviewCards productId={product.id} />
      </div>
      <ProductClientFetch
        name="Related product"
        description="Explore more products from our similar collections."
        filter={{ category: product.category, page: 1, limit: 8 }}
      />
    </div>
  );
};

export default Page;
