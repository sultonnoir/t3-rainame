import ProductPage from "@/components/product/product-page";
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
    </div>
  );
};

export default Page;
