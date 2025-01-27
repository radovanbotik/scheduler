import { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <div className="//rounded-md flex h-5 items-center bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-vodafone-gray-500/10">
      {children}
    </div>
  );
}
