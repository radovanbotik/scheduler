"use client";

import {
  format,
  isSameMonth,
  isToday,
  isSameDay,
  startOfMonth,
  endOfMonth,
  addDays,
  subDays,
  getDay,
  eachDayOfInterval,
} from "date-fns";
import { ShiftPattern } from "@prisma/client";
import { ShiftWithDetails } from "@/app/api/getShifts/route";
import { cn } from "@/lib/utility/cn";
import { useState } from "react";
import { Modal } from "@/components/shared/Modal";
import AssignmentList from "./AssignmentList";
import { DayHeader } from "./DayHeader";
import { Header } from "./Header";

type MonthViewProps = {
  currentDate: Date;
  shiftPatterns: ShiftPattern[];
  shifts: ShiftWithDetails[];
  prevMonth: () => void;
  nextMonth: () => void;
};

export default function MonthView({
  currentDate,
  shiftPatterns,
  shifts,
  prevMonth,
  nextMonth,
}: MonthViewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<ShiftWithDetails>();

  function openModal(shift: ShiftWithDetails) {
    setSelectedShift(shift);
    setIsOpen(true);
  }

  // Helper to generate the 42 days for the month view
  function getCalendarDays(date: Date) {
    const TILES = 42;
    const startOfMonthDate = startOfMonth(date);
    const endOfMonthDate = endOfMonth(date);
    const firstDayPosition = getDay(startOfMonthDate);
    const daysFromPreviousMonth = (firstDayPosition + 6) % 7;

    const daysInCurrentMonth = eachDayOfInterval({
      start: startOfMonthDate,
      end: endOfMonthDate,
    });
    const daysFromNextMonth =
      TILES - daysInCurrentMonth.length - daysFromPreviousMonth;

    const startOfCalendar = subDays(startOfMonthDate, daysFromPreviousMonth);
    const endOfCalendar = addDays(endOfMonthDate, daysFromNextMonth);

    return eachDayOfInterval({ start: startOfCalendar, end: endOfCalendar });
  }

  const calendarDays = getCalendarDays(currentDate);

  console.log(currentDate);

  // return <></>;

  return (
    <>
      <div className="lg:flex lg:h-full lg:flex-col">
        <Header
          currentDate={currentDate}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />

        <div className="relative shadow ring-1 ring-black/5 lg:flex lg:h-[calc(100vh-181px)] lg:flex-auto lg:flex-col lg:overflow-y-auto">
          <DayHeader />
          <div className="isolate flex bg-vodafone-gray-200 text-xs/6 text-gray-700 lg:flex-auto">
            {/* DESKTOP */}
            <div className="isolate hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
              {calendarDays.map((day) => {
                // find all shifts for this date
                const dailyShifts = shifts.filter((shift) =>
                  isSameDay(shift.shift_date, day),
                );

                return (
                  <div
                    key={format(day, "yyyy-MM-dd")}
                    className={cn(
                      isSameMonth(day, currentDate)
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

                    {shiftPatterns.map((pattern) => {
                      // does a shift exist for this pattern on this day?
                      const matchedShift = dailyShifts.find(
                        (shift) => shift.pattern_id === pattern.pattern_id,
                      );

                      return (
                        <button
                          key={pattern.pattern_id}
                          className="//px-3 group flex w-full"
                          onClick={() =>
                            matchedShift && openModal(matchedShift)
                          }
                        >
                          <div
                            className={cn(
                              "flex-auto truncate text-start font-medium text-gray-900 group-hover:text-vodafone-600",
                            )}
                          >
                            {pattern.shift_name}
                          </div>
                          <span className="//group-hover:inherit ml-3 hidden flex-none text-gray-500 group-hover:text-vodafone-600 xl:block">
                            {matchedShift?.ShiftAssignments.length ?? 0}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* MOBILE */}
            <div className="grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
              {calendarDays.map((day) => (
                <button
                  key={format(day, "yyyy-MM-dd")}
                  className={cn(
                    isSameMonth(day, currentDate) ? "bg-white" : "bg-gray-50",
                    isToday(day) && "font-semibold text-vodafone-600",
                    !isToday(day) &&
                      isSameMonth(day, currentDate) &&
                      "text-gray-900",
                    !isSameMonth(day, currentDate) && "text-gray-500",
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
              <p className="">{selectedShift.pattern.shift_name} Shift</p>
              <p className="text-sm">
                {selectedShift.pattern.start_time} -{" "}
                {selectedShift.pattern.end_time}
              </p>
            </>
          }
        >
          <AssignmentList {...selectedShift} />
        </Modal>
      )}
    </>
  );
}
