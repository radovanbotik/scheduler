"use client";

import { cn } from "@/lib/utility/cn";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

type TNavlink = {
  className?: string;
  children?: ReactNode;
  icon?: React.ElementType;
  name?: string;
  tooltip?: string;
} & LinkProps;

export function Navlink({
  href,
  className,
  icon: Icon,
  name,
  tooltip,
}: TNavlink) {
  const pathname = usePathname();
  const isCurrent = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        isCurrent
          ? "bg-vodafone-800 text-white"
          : "text-vodafone-400 hover:bg-vodafone-800 hover:text-white",
        "group relative flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
      )}
    >
      {Icon && <Icon aria-hidden="true" className="size-6 shrink-0" />}
      {name}
    </Link>
  );
}
