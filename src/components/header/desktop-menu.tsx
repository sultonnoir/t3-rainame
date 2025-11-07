"use client";
import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Categories } from "@/server/api/routers/category/category-schema";

interface DesktopMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Categories[];
}

export const DesktopMenu = ({ className, categories }: DesktopMenuProps) => {
  return (
    <NavigationMenu viewport={false} className="hidden lg:flex">
      <NavigationMenuList className={cn("flex-wrap justify-start", className)}>
        {categories.map((category) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuTrigger className="bg-transparent capitalize">
              {category.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-background">
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-max lg:grid-cols-2">
                <li className="col-span-1">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                      href={`/collections/${category.slug}`}
                    >
                      <div className="mt-4 mb-2 text-lg font-medium capitalize">
                        {category.name}
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        {category.desc}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li className="col-span-1 grid grid-cols-1">
                  {category.subcategory.map((sub) => (
                    <NavigationMenuLink asChild key={sub.id}>
                      <Link
                        href={`/collections/${category.slug}/${sub.slug}`}
                        className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                      >
                        <div className="text-sm leading-none font-medium capitalize">
                          {sub.name}
                        </div>
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                          {sub.desc}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
