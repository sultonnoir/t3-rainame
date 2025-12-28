import { Search } from "lucide-react";
import { DesktopMenu } from "./desktop-menu";
import { MobileMenu } from "./mobile-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import Logo from "./logo";
import { api } from "@/trpc/server";
import CartSidebar from "@/components/cart/cart-sidebar";

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
          <CartSidebar />
          <MobileMenu categories={data} />
        </div>
      </div>
    </header>
  );
}
