import { FilterSidebar } from "@/components/filter/filter-sidebar";
import React, { Suspense, type ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container min-h-screen py-3">
      <div className="flex gap-10">
        <Suspense>
          <FilterSidebar />
        </Suspense>
        {children}
      </div>
    </div>
  );
};

export default Layout;
