"use client";

import { cn } from "@/lib/utility/cn";

import { useEffect, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  addDays,
  subDays,
  isSameMonth,
  format,
  getDay,
  subMonths,
  isToday,
  isThisMonth,
  formatISO,
  isSameDay,
} from "date-fns";
import { DayHeader } from "./DayHeader";
import { Header } from "./Header";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Shift, ShiftPattern } from "@prisma/client";
import { ShiftWithDetails } from "@/app/api/getShifts/route";

export default function MonthView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string>();
  const [calendar, setCalendar] = useState<
    {
      date: Date;
      shiftPatterns?: ShiftPattern[];
      shifts?: ShiftWithDetails[];
    }[]
  >([]);

  function getDaysInMonth(date: Date) {
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);
    return eachDayOfInterval({ start: startDate, end: endDate });
  }

  async function buildCalendar(date: Date) {
    // fetch everything in parallel
    const [patterns, shifts] = await Promise.all([
      getShiftPatterns(),
      getShifts(date),
    ]);
    if (!patterns || !shifts) {
      // If either fetch fails, bail out. You can add better error handling if needed.
      return [];
    }
    const TILES = 42;

    const daysInCurrentMonth = getDaysInMonth(date);
    const startOfMonthDate = startOfMonth(date);
    const endOfMonthDate = endOfMonth(date);
    const firstDayOfMonthPosition = getDay(startOfMonthDate);
    const daysFromPreviousMonth = (firstDayOfMonthPosition + 6) % 7;
    const daysFromNextMonth =
      TILES - daysInCurrentMonth.length - daysFromPreviousMonth;

    const startOfCalendar = subDays(startOfMonthDate, daysFromPreviousMonth);
    const endOfCalendar = addDays(endOfMonthDate, daysFromNextMonth);

    const allCalendarDays = eachDayOfInterval({
      start: startOfCalendar,
      end: endOfCalendar,
    });

    const calendarResult = allCalendarDays.map((calendarDay) => {
      const dailyShifts = shifts.filter((shift) => {
        return isSameDay(shift.shift_date, calendarDay);
      });

      return {
        date: calendarDay,
        shiftPatterns: patterns,
        shifts: dailyShifts,
      };
    });

    console.log(calendarResult);
    return calendarResult;
  }

  function prevMonth(currentDate: Date) {
    return setCurrentDate((prev) => subMonths(currentDate, 1));
  }

  function nextMonth(currentDate: Date) {
    return setCurrentDate((prev) => addMonths(currentDate, 1));
  }

  async function getShiftPatterns(): Promise<ShiftPattern[] | undefined> {
    try {
      const response = await fetch("/api/shiftpatterns");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result: ShiftPattern[] = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getShifts(
    date: Date,
  ): Promise<ShiftWithDetails[] | undefined> {
    try {
      const response = await fetch(`/api/getShifts?date=${date.toISOString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result: ShiftWithDetails[] = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    (async () => {
      const data = await buildCalendar(currentDate);
      setCalendar(data || []);
    })();
  }, [currentDate]);

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <Header
        currentDate={currentDate}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <div className="relative h-[calc(100vh-181px)] overflow-y-scroll shadow ring-1 ring-black/5 lg:flex lg:flex-auto lg:flex-col">
        <DayHeader />
        <div className="isolate flex bg-gray-200 text-xs/6 text-gray-700 lg:flex-auto">
          {/* DESKTOP */}
          <div className="isolate hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {calendar?.map((day) => (
              <div
                key={format(day.date, "yyyy-MM-dd")}
                className={cn(
                  isSameMonth(day.date, currentDate)
                    ? "bg-white"
                    : "//bg-gradient-to-l //to-vodafone-200 //from-vodafone-100 bg-vodafone-gray-50 text-gray-500",
                  "relative space-y-1 px-3 py-2",
                )}
                // onClick={() => setSelectedDay((prev) => day.date)}
              >
                {/* DISPLAY DATE - FORMAT 'd' */}
                <time
                  dateTime={format(day.date, "yyyy-MM-dd")}
                  className={
                    isToday(day.date)
                      ? "flex size-6 items-center justify-center rounded-full bg-vodafone-600 font-semibold text-white"
                      : undefined
                  }
                >
                  {format(day.date, "d")}
                </time>
                {/* DISPLAY SHIFTS AND AGENT COUNT */}
                {day?.shiftPatterns && (
                  <div className="">
                    {/* {day.date} */}
                    {day?.shiftPatterns.map((shiftPattern) => (
                      <a
                        key={shiftPattern.pattern_id}
                        href={"agents"}
                        className={cn("//px-3 group flex")}
                      >
                        <div
                          className={cn(
                            "flex-auto truncate font-medium text-gray-900 group-hover:text-vodafone-600",
                          )}
                        >
                          {shiftPattern.shift_name}
                        </div>
                        <span className="//group-hover:inherit ml-3 hidden flex-none text-gray-500 group-hover:text-vodafone-600 xl:block">
                          {day?.shifts?.find(
                            (shift) =>
                              shift.pattern_id === shiftPattern.pattern_id,
                          )?.ShiftAssignments.length ?? 0}
                        </span>
                      </a>
                    ))}
                  </div>
                )}

                {/* {day.events && day.events.length > 0 && (
                  <ol className="mt-2">
                    {day.events.slice(0, 2).map((event) => (
                      <li key={event.id}>
                        <a href={event.href} className="group flex">
                          <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-vodafone-600">
                            {event.name}
                          </p>
                          <time
                            dateTime={event.datetime}
                            className="ml-3 hidden flex-none text-gray-500 group-hover:text-vodafone-600 xl:block"
                          >
                            {event.time}
                          </time>
                        </a>
                      </li>
                    ))}
                    {day.events.length > 2 && (
                      <li className="text-gray-500">
                        + {day.events.length - 2} more
                      </li>
                    )}
                  </ol>
                )} */}
              </div>
            ))}
          </div>
          {/*  MOBILE VIEW */}
          {/* <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {dayz.map((day) => (
              <button
                key={day.date}
                type="button"
                className={cn(
                  isThisMonth(day.date) ? "bg-white" : "bg-gray-50",
                  (selectedDay?.date === day.date || isToday(day.date)) &&
                    "font-semibold",
                  selectedDay?.date === day.date && "text-white",
                  selectedDay?.date !== day.date &&
                    isToday(day.date) &&
                    "text-vodafone-600",
                  selectedDay?.date !== day.date &&
                    isThisMonth(day.date) &&
                    !isToday(day.date) &&
                    "text-gray-900",
                  selectedDay?.date !== day.date &&
                    !isThisMonth(day.date) &&
                    !isToday(day.date) &&
                    "text-gray-500",
                  "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10",
                )}
              >
                <time
                  dateTime={day.date}
                  className={cn(
                    selectedDay?.date === day.date &&
                      "flex size-6 items-center justify-center rounded-full",
                    selectedDay?.date === day.date &&
                      isToday(day.date) &&
                      "bg-vodafone-600",
                    selectedDay?.date === day.date &&
                      !isToday(day.date) &&
                      "bg-gray-900",
                    "ml-auto",
                  )}
                >
                  {format(day.date, "d")}
                </time>
                {day.events && (
                  <span className="sr-only">{day.events.length} events</span>
                )}
                {day.events && day.events.length > 0 && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.events.map((event) => (
                      <span
                        key={event.id}
                        className="mx-0.5 mb-1 size-1.5 rounded-full bg-gray-400"
                      />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
