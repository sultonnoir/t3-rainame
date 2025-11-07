import { Search, ShoppingBag, UserIcon } from "lucide-react";

import { DesktopMenu } from "./desktop-menu";
import { MobileMenu } from "./mobile-menu";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import Logo from "./logo";
import { api } from "@/trpc/server";

export default async function MainNavbar() {
  const data = await api.category.getAll();
  return (
    <header className="bg-background sticky top-0 z-50 mx-auto h-14 w-full px-4">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Logo />
          <DesktopMenu categories={data} />
        </div>
        <div className="flex items-center gap-2">
          <InputGroup className="max-w-md">
            <InputGroupInput placeholder="Search..." className="max-w-4xl" />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="cart"
            title="cart"
          >
            <ShoppingBag />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="profile"
            title="profile"
          >
            <UserIcon />
          </Button>
          <MobileMenu categories={data} />
        </div>
      </div>
    </header>
  );
}
