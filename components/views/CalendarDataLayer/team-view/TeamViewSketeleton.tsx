"use client";

import { isSameMonth, isToday, format } from "date-fns";
import { cn } from "@/lib/utility/cn";
import { getCalendarDays } from "@/lib/utility/calendar";
import { DaysOfWeek } from "./DaysOfWeek";
import { Controls } from "../controls/Controls";

type TeamViewProps = {
  currentDate: Date;
};

export function TeamViewSkeleton({ currentDate: serverDate }: TeamViewProps) {
  const calendarDays = getCalendarDays(serverDate);

  return (
    <div className="relative shadow ring-1 ring-black/5 lg:flex lg:h-[calc(100vh-181px)] lg:flex-auto lg:flex-col lg:overflow-y-auto">
      <DaysOfWeek />
      <div className="isolate flex bg-vodafone-gray-200 text-xs/6 text-gray-700 lg:flex-auto">
        {/* Desktop */}
        <div className="isolate hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
          {calendarDays.map((day) => {
            return (
              <div
                key={format(day, "yyyy-MM-dd")}
                className={cn(
                  isSameMonth(day, serverDate)
                    ? "bg-white"
                    : "bg-vodafone-gray-50 text-gray-500",
                  "relative space-y-1 px-3 py-2",
                )}
              >
                <time
                  dateTime={format(day, "yyyy-MM-dd")}
                  className={
                    isToday(day)
                      ? "flex size-6 items-center justify-center rounded-full bg-vodafone-600 font-semibold text-white"
                      : undefined
                  }
                >
                  {format(day, "d")}
                </time>

                <div role="status" className="group w-full animate-pulse-fast">
                  <div className="2-full mb-4 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="mb-2.5 h-2 max-w-[140px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="mb-2.5 h-2 max-w-[110px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="mb-2.5 h-2 max-w-[90px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-2 max-w-[140px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
          {calendarDays.map((day) => (
            <button
              key={format(day, "yyyy-MM-dd")}
              className={cn(
                isSameMonth(day, serverDate) ? "bg-white" : "bg-gray-50",
                isToday(day) && "font-semibold text-vodafone-600",
                !isToday(day) &&
                  isSameMonth(day, serverDate) &&
                  "text-gray-900",
                !isSameMonth(day, serverDate) && "text-gray-500",
                "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10",
              )}
            >
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                className={cn(
                  "flex size-6 items-center justify-center rounded-full",
                  isToday(day) && "bg-vodafone-600 text-white",
                  !isToday(day) && "bg-gray-900 text-white",
                  "ml-auto",
                )}
              >
                {format(day, "d")}
              </time>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
