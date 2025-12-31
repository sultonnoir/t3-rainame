import Link from "next/link";
import { HomeHero } from "@/components/home/home-hero";
import { HomeFeature } from "@/components/home/home-feature";
import HomeCategory from "@/components/home/home-category";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HomeEmailSubscription from "@/components/home/home-email-subscribe";
import ProductClientFetch from "@/components/product/product-client-fetch";
import { Banner_01, Banner_05 } from "@/components/home/home-banner";

export default async function Home() {
  return (
    <main className="min-h-screen py-5">
      <HomeHero />
      <div className="container mx-auto space-y-10">
        <ProductClientFetch
          name="Fresh & New"
          description="Check out our newest products that just dropped! Trendy designs and premium quality made for your unique style."
          filter={{ sortBy: "new-arrival", page: 1, limit: 8 }}
        />
        <HomeFeature />
        <HomeCategory />
        <Banner_01 />
        <Banner_05 />
        <ProductClientFetch
          name="Best Deals"
          description="Don’t miss out on our best offers! Save big on top products with limited-time discounts."
          filter={{ sortBy: "rating", page: 1, limit: 8 }}
        />
        <div className="flex grow items-center justify-center">
          <Button
            className="group h-12 px-8"
            size="lg"
            variant="outline"
            asChild
          >
            <Link href="/collections">
              View All Products
              <ArrowRight
                className={`ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1`}
              />
            </Link>
          </Button>
        </div>
      </div>
      <div className="container mx-auto flex flex-col">
        <HomeEmailSubscription />
      </div>
    </main>
  );
}
