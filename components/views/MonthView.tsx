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
} from "date-fns";
import { DayHeader } from "./DayHeader";
import { Header } from "./Header";
import { ClockIcon } from "@heroicons/react/24/outline";

type TDay2 = {
  date: string;

  shifts: {
    id: string;
    name: string;
    agents: {}[];
  }[];
};

export default function MonthView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<TDay2>();
  const [calendar, setCalendar] = useState();

  function getDaysInMonth(date: Date) {
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);
    return eachDayOfInterval({ start: startDate, end: endDate });
  }

  async function createCalendar(date: Date) {
    const TILES = 42;
    const shiftPatterns = await getShiftPatterns();
    const shifts = await getShifts(date);
    console.log(shifts);
    const daysInCurrentMonth = getDaysInMonth(date);
    const startOfMonthDate = startOfMonth(date);
    const endOfMonthDate = endOfMonth(date);
    const firstDayOfMonthPosition = getDay(startOfMonthDate);
    // const daysFromPreviousMonth = firstDayOfMonthPosition - 1;
    const daysFromPreviousMonth = (firstDayOfMonthPosition + 6) % 7;
    const daysFromNextMonth =
      TILES - daysInCurrentMonth.length - daysFromPreviousMonth;

    const startOfCalendar = subDays(startOfMonthDate, daysFromPreviousMonth);
    const endOfCalendar = addDays(endOfMonthDate, daysFromNextMonth);
    const allCalendarDays = eachDayOfInterval({
      start: startOfCalendar,
      end: endOfCalendar,
    });

    const result = allCalendarDays.map((dateObject, i) => {
      return {
        date: dateObject.toDateString(),
        shiftPatterns: shiftPatterns,
      };
    });
    setCalendar(result);
  }
  //   console.log(calendar);

  function prevMonth(currentDate: Date) {
    return setCurrentDate((prev) => subMonths(currentDate, 1));
  }

  function nextMonth(currentDate: Date) {
    return setCurrentDate((prev) => addMonths(currentDate, 1));
  }

  async function getShiftPatterns() {
    try {
      const response = await fetch("/api/shiftpatterns");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getShifts(date: Date) {
    try {
      const response = await fetch(`/api/getShifts?date=${date.toISOString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    createCalendar(currentDate);
  }, [currentDate]);

  //   return <>haha</>;
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
                key={day.date}
                className={cn(
                  isSameMonth(day.date, currentDate)
                    ? "bg-white"
                    : "//bg-gradient-to-l //to-vodafone-200 //from-vodafone-100 bg-vodafone-gray-50 text-gray-500",
                  "relative space-y-1 px-3 py-2",
                )}
                onClick={() => setSelectedDay((prev) => day)}
              >
                {/* DISPLAY DATE - FORMAT 'd' */}
                <time
                  dateTime={day.date}
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
                    {day?.shiftPatterns.map((shiftPattern) => (
                      <a
                        key={shiftPattern.pattern_id}
                        href={"agents"}
                        className={cn(
                          "//px-3 group flex",

                          //   shift.id === "earlyMorning" &&
                          //     "bg-orange-100 text-orange-500 group-hover:bg-orange-200 group-hover:text-orange-600",
                          //   shift.id === "morning" &&
                          //     "bg-sky-100 text-sky-500 group-hover:bg-sky-200 group-hover:text-sky-600",
                          //   shift.id === "standardDay" &&
                          //     "bg-green-100 text-green-500 group-hover:bg-green-200 group-hover:text-green-600",
                          //   shift.id === "afternoon" &&
                          //     "bg-yellow-100 text-yellow-500 group-hover:bg-yellow-200 group-hover:text-yellow-600",
                          //   shift.id === "night" &&
                          //     "bg-stone-100 text-stone-500 group-hover:bg-stone-200 group-hover:text-stone-600",
                        )}
                      >
                        <div
                          className={cn(
                            "flex-auto truncate font-medium text-gray-900 group-hover:text-vodafone-600",
                          )}
                        >
                          {shiftPattern.shift_name}
                        </div>
                        <span className="//group-hover:inherit ml-3 hidden flex-none text-gray-500 group-hover:text-vodafone-600 xl:block">
                          {/* {shift.agents.length} */}0
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
      {/* {selectedDay && selectedDay?.events.length > 0 && (
        <div className="px-4 py-10 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black/5">
            {selectedDay.events.map((event) => (
              <li
                key={event.id}
                className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
              >
                <div className="flex-auto">
                  <p className="font-semibold text-gray-900">{event.name}</p>
                  <time
                    dateTime={event.datetime}
                    className="mt-2 flex items-center text-gray-700"
                  >
                    <ClockIcon
                      className="mr-2 size-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {event.time}
                  </time>
                </div>
                <a
                  href={event.href}
                  className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                >
                  Edit<span className="sr-only">, {event.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )} */}
    </div>
  );
}
