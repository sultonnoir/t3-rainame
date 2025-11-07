import { DotIcon, MenuIcon, XIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavItemMobile } from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Categories } from "@/server/api/routers/category/category-schema";

interface MobileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Categories[];
}

export function MobileMenu({ categories }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          title="menu categories"
          aria-label="menu categories"
          variant="ghost"
          className="rounded-full lg:hidden"
        >
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="bg-background/95 supports-backdrop-filter:bg-background/80 w-full gap-0 backdrop-blur-lg"
        showClose={false}
      >
        <div className="flex h-14 items-center justify-end border-b px-4">
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar categories</SheetTitle>
            <SheetDescription>Select category</SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
            <Button size="icon" variant="ghost" className="rounded-full">
              <XIcon className="size-5" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </div>
        <div className="container grid gap-y-2 overflow-y-auto px-4 pt-5 pb-12">
          <Accordion type="single" collapsible>
            {categories.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className="capitalize hover:no-underline">
                  {section.name}
                </AccordionTrigger>
                <AccordionContent className="space-y-1">
                  <ul className="grid gap-1">
                    {section.subcategory.map((link) => (
                      <li key={link.id}>
                        <SheetClose asChild>
                          <NavItemMobile
                            item={{
                              title: link.name,
                              href: link.slug,
                              icon: DotIcon,
                            }}
                            href={link.slug}
                            className="capitalize"
                          />
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
}
