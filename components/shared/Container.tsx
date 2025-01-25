import { cn } from "@/lib/utility/cn";
import { ReactNode } from "react";

type TContainer = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className }: TContainer) {
  return (
    <div
      className={cn(
        "relative mx-auto size-full max-w-7xl sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
