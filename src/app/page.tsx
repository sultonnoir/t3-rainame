import Link from "next/link";

import { HydrateClient } from "@/trpc/server";
import { HomeHero } from "@/components/home/home-hero";
import HomeProduct from "@/components/home/home-products";
import { HomeFeature } from "@/components/home/home-feature";
import HomeCategory from "@/components/home/home-category";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HomeEmailSubscription from "@/components/home/home-email-subscribe";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen py-5">
        <HomeHero />
        <div className="container mx-auto space-y-10">
          <HomeProduct
            name="Fresh & New"
            description="Check out our newest products that just dropped! Trendy designs and premium quality made for your unique style."
            sortBy="new-arrival"
          />
          <HomeFeature />
          <HomeCategory />
          <HomeProduct
            name="Best Deals"
            description="Don’t miss out on our best offers! Save big on top products with limited-time discounts."
            sortBy="rating"
          />
          <div className="flex grow items-center justify-center">
            <Link href="/">
              <Button className="group h-12 px-8" size="lg" variant="outline">
                View All Products
                <ArrowRight
                  className={`ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1`}
                />
              </Button>
            </Link>
          </div>
        </div>
        <div className="container mx-auto flex flex-col">
          <HomeEmailSubscription />
        </div>
      </main>
    </HydrateClient>
  );
}
