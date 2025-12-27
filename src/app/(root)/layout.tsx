import MainNavbar from "@/components/header/main-navbar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <MainNavbar />
      {children}
      <Toaster richColors position="bottom-left" />
    </div>
  );
};

export default Layout;
