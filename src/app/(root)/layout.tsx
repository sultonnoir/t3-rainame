import MainNavbar from "@/components/header/main-navbar";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainNavbar />
      {children}
    </>
  );
};

export default Layout;
