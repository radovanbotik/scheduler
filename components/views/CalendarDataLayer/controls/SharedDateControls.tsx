import { cn } from "@/lib/utility/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { ComponentPropsWithoutRef } from "react";

type TDateControls = {
  currentDate: Date;
  nextMonth: (currentDate: Date) => void;
  prevMonth: (currentDate: Date) => void;
};

function Button({
  children,
  position,
  screenReaderText,
  onClick,
}: {
  children: React.ReactNode;
  position: "LEFT" | "RIGHT" | "MIDDLE";
  screenReaderText: string;
} & ComponentPropsWithoutRef<"button">) {
  const buttonPosition = {
    LEFT: "flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-vodafone-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50",
    MIDDLE:
      "hidden border-y border-vodafone-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block",
    RIGHT:
      "flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-vodafone-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50",
  };

  return (
    <button
      type="button"
      className={cn(buttonPosition[position])}
      onClick={onClick}
    >
      <span className="sr-only">{screenReaderText}</span>
      {children}
    </button>
  );
}

export function SharedDateControls({
  currentDate,
  nextMonth,
  prevMonth,
}: TDateControls) {
  return (
    <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
      {/* PREVIOUS MONTH CONTROL */}
      <Button
        position="LEFT"
        screenReaderText="Previous month"
        onClick={() => prevMonth(currentDate)}
      >
        <ChevronLeftIcon className="size-5" aria-hidden="true" />
      </Button>

      <Button position="MIDDLE" screenReaderText={currentDate.toDateString()}>
        {format(currentDate, "MMMM")}
      </Button>

      <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />

      <Button
        position="RIGHT"
        screenReaderText=">Next month"
        onClick={() => nextMonth(currentDate)}
      >
        <ChevronRightIcon className="size-5" aria-hidden="true" />
      </Button>
    </div>
  );
}
