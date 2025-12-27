import MainNavbar from "@/components/header/main-navbar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainNavbar />
      {children}
      <Toaster richColors position="bottom-left" />
    </>
  );
};

export default Layout;
