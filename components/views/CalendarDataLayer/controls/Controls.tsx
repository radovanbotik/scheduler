"use client";

import { addMonths, format, subMonths } from "date-fns";
import { useRouter } from "next/navigation";
import { DesktopViewControl } from "./DesktopViewControl";
import { Admin } from "./Admin";
import { SharedDateControls } from "./SharedDateControls";
import { MobileViewControls } from "./MobileViewControls";

type THeader = {
  currentDate: Date;
};

export function Controls({ currentDate }: THeader) {
  const router = useRouter();

  function prevMonth(currentDate: Date) {
    const prev = subMonths(currentDate, 1);
    router.push(`?date=${prev.toISOString()}`);
  }

  function nextMonth(currentDate: Date) {
    const next = addMonths(currentDate, 1);
    router.push(`?date=${next.toISOString()}`);
  }

  const isAdmin = false;

  return (
    <header className="//px-6 flex items-center justify-between border-b border-vodafone-gray-200 py-4 lg:flex-none">
      <h1 className="text-base font-semibold text-gray-900">
        <time dateTime="2022-01">{format(currentDate, "MMMM yyyy")}</time>
      </h1>
      <div className="flex items-center">
        <SharedDateControls
          currentDate={currentDate}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
        <DesktopViewControl />
        {isAdmin && <div className="ml-6 h-6 w-px bg-gray-300" />}
        {isAdmin && <Admin />}
        <MobileViewControls isAdmin={isAdmin} />
      </div>
    </header>
  );
}
