import React from "react";
import { Image } from "@unpic/react/nextjs";
import { cn } from "@/lib/utils";
import Link from "next/link";

type LogoProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex w-fit items-center ring-0 outline-none",
        className
      )}>
      <Image
        src="/logo.png"
        height={40}
        width={40}
        alt="logo"
      />
      <p className="hidden text-lg font-bold lg:block">Rainame</p>
    </Link>
  );
};

export default Logo;
