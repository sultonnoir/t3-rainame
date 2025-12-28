import { cn } from "@/lib/utils";
import { BadgeDollarSign, Globe, Repeat, Truck } from "lucide-react";
import React from "react";

export default function ProductBenefit() {
  const benefitList = [
    {
      title: "Free Shipping",
      description: "On orders over $50.00",
      icon: Truck,
      className: "bg-red-50 dark:bg-opacity-90",
    },
    {
      title: "Very easy to return",
      description: "Just email to return",
      icon: Repeat,
      className: "bg-green-50 dark:bg-opacity-90",
    },
    {
      title: "Nationwide Delivery",
      description: "Fast delivery nationwide.",
      icon: Globe,
      className: "bg-blue-50 dark:bg-opacity-90",
    },
    {
      title: "Refunds policy",
      description: "60 days return for any reason",
      icon: BadgeDollarSign,
      className: "bg-yellow-50 dark:bg-opacity-90",
    },
  ];

  return (
    <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
      {benefitList.map((item) => (
        <div
          key={item.title}
          className={cn(
            "flex flex-col rounded-lg p-4 text-black",
            item.className,
          )}
        >
          <item.icon className="size-6" />
          <h3 className="mt-2 text-[16px] font-medium">{item.title}</h3>
          <p className="mt-1 text-sm text-black/80">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
