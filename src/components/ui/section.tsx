import { cn } from "@/lib/utils";
import React from "react";

type SectionProps = React.HTMLAttributes<HTMLElement>;

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section
      {...props}
      className={cn(
        "dark:shadow-accent/50 space-y-2 rounded-b-2xl lg:border-b lg:p-4 lg:shadow-lg",
        className,
      )}
    >
      {children}
    </section>
  );
}
