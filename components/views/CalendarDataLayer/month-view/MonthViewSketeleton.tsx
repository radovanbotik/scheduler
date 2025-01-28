"use client";

import { useState } from "react";
import {
  isSameDay,
  isSameMonth,
  isToday,
  format,
  startOfMonth,
  endOfMonth,
  subDays,
  addDays,
  getDay,
  eachDayOfInterval,
  addMonths,
  subMonths,
} from "date-fns";
import { ShiftPattern } from "@prisma/client";
import { ShiftWithDetails } from "@/app/api/getShifts/route";
import { cn } from "@/lib/utility/cn";
import { Modal } from "@/components/shared/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { getCalendarDays } from "@/lib/utility/calendar";
import { DescriptionList } from "./DescriptionList";
import { DaysOfWeek } from "./DaysOfWeek";
import { Controls } from "../controls/Controls";

type MonthViewProps = {
  currentDate: Date;
};

export function MonthViewSkeleton({ currentDate: serverDate }: MonthViewProps) {
  const router = useRouter();

  // 1) Helper to build the array of 42 calendar days

  const calendarDays = getCalendarDays(serverDate);

  // 2) We can't fetch directly in the server component for the new month
  //    from here. Instead, we'd navigate so Next.js re-renders the server
  //    component with a new 'searchParams.date'.
  //    We'll do that by pushing a new query param:

  function handlePrevMonth() {
    const prev = subMonths(serverDate, 1);
    router.push(`?date=${prev.toISOString()}`);
  }

  function handleNextMonth() {
    const next = addMonths(serverDate, 1);
    router.push(`?date=${next.toISOString()}`);
  }

  return (
    <>
      <div className="lg:flex lg:h-full lg:flex-col">
        <Controls
          currentDate={serverDate}
          prevMonth={handlePrevMonth}
          nextMonth={handleNextMonth}
        />

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

                    <div
                      role="status"
                      className="group w-full animate-pulse-fast"
                    >
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
      </div>
    </>
  );
}
