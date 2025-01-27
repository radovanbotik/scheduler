"use client";

import { cn } from "@/lib/utility/cn";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, ReactNode, useState } from "react";

export type TNavlink = {
  activeStyles: string;
  inactiveStyles: string;
  className?: string;
  children?: ReactNode;
  name?: string;
} & LinkProps;

export const Navlink = forwardRef<HTMLAnchorElement, TNavlink>(function Navlink(
  { activeStyles, inactiveStyles, children, href, className, name }: TNavlink,
  ref,
) {
  const pathname = usePathname();
  const isCurrent = pathname === href;

  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        isCurrent ? activeStyles : inactiveStyles,
        "group relative flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
        className,
      )}
    >
      {/* {Icon && <Icon aria-hidden="true" className="size-6 shrink-0" />} */}
      {children}
      {name}
    </Link>
  );
});
