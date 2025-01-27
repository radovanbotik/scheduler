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
import { Controls } from "../Controls";

type MonthViewProps = {
  currentDate: Date;
  shiftPatterns: ShiftPattern[];
  shifts: ShiftWithDetails[];
};

export function MonthView({
  currentDate: serverDate,
  shiftPatterns,
  shifts,
}: MonthViewProps) {
  const router = useRouter();

  // Because this is a Client Component, `serverDate` is a prop from the server.
  // We could store it locally if we want local state, but then we'd need a plan
  // for re-fetching data. Let's show an example approach using URL params:

  const [isOpen, setIsOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<ShiftWithDetails>();

  function openModal(shift: ShiftWithDetails) {
    setSelectedShift(shift);
    setIsOpen(true);
  }

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
                const dailyShifts = shifts.filter((shift) =>
                  isSameDay(shift.shift_date, day),
                );

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

                    {/* Patterns */}
                    {shiftPatterns.map((pattern) => {
                      const matchedShift = dailyShifts.find(
                        (shift) => shift.pattern_id === pattern.pattern_id,
                      );

                      return (
                        <button
                          key={pattern.pattern_id}
                          className="//px-3 group flex w-full"
                          onClick={() => {
                            if (matchedShift) openModal(matchedShift);
                          }}
                        >
                          <div
                            className={cn(
                              "flex-auto truncate text-start font-medium text-gray-900 group-hover:text-vodafone-600",
                            )}
                          >
                            {pattern.shift_name}
                          </div>
                          <span className="ml-3 hidden flex-none text-gray-500 group-hover:text-vodafone-600 xl:block">
                            {matchedShift?.ShiftAssignments.length ?? 0}
                          </span>
                        </button>
                      );
                    })}
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

      {selectedShift && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={format(selectedShift.shift_date, "iiii do LLLL yyyy")}
          description={
            <>
              <p>{selectedShift.pattern.shift_name} Shift</p>
              <p className="text-sm">
                {selectedShift.pattern.start_time} -{" "}
                {selectedShift.pattern.end_time}
              </p>
            </>
          }
        >
          <DescriptionList {...selectedShift} />
        </Modal>
      )}
    </>
  );
}
