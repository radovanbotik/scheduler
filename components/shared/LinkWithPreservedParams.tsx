"use client";

import Link, { LinkProps } from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export function LinkWithPreservedParams({
  href,
  children,
  ...props
}: LinkProps & { children: React.ReactNode; className: string }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  return (
    <Suspense>
      <Link href={`${href}?${params.toString()}`} {...props}>
        {children}
      </Link>
    </Suspense>
  );
}
