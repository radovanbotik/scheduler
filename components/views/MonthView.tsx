"use client";

import { cn } from "@/lib/utility/cn";

import { useEffect, useState } from "react";
import {
  addMonths,
  getDaysInMonth,
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
} from "date-fns";
import { DayHeader } from "./DayHeader";
import { Header } from "./Header";

export default function MonthView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<{
    date: string;
    isCurrentMonth: boolean;
    events: {
      id: number;
      name: string;
      time: string;
      datetime: string;
      href: string;
    }[];
    isSelected: boolean;
  }>();

  function getDaysInMonth(date: Date) {
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);
    return eachDayOfInterval({ start: startDate, end: endDate });
  }
  const onlyDays = getDaysInMonth(new Date());

  function getDayz(date: Date) {
    const tiles = 42;

    const daysInCurrentMonth = getDaysInMonth(date);
    const startOfMonthDate = startOfMonth(date);
    const endOfMonthDate = endOfMonth(date);
    const firstDayOfMonthPosition = getDay(startOfMonthDate);
    const lastDayofMonthPosition =
      firstDayOfMonthPosition + daysInCurrentMonth.length;
    const daysFromPreviousMonth = firstDayOfMonthPosition - 1;
    const daysFromNextMonth =
      42 - daysInCurrentMonth.length - daysFromPreviousMonth;

    const startOfCalendar = subDays(startOfMonthDate, daysFromPreviousMonth);
    const endOfCalendar = addDays(endOfMonthDate, daysFromNextMonth);
    const allCalendarDays = eachDayOfInterval({
      start: startOfCalendar,
      end: endOfCalendar,
    });

    return allCalendarDays.map((dateObject, i) => {
      return {
        date: dateObject.toDateString(),
        isCurrentMonth: false,
        events: [
          {
            id: i + 1,
            name: "Agents",
            time: "10",
            datetime: "2022-02-04T21:00",
            href: "#",
          },
        ],
        isSelected: i === 20 ? true : false,
      };
    });
  }

  function prevMonth(currentDate: Date) {
    return setCurrentDate((prev) => subMonths(currentDate, 1));
  }

  function nextMonth(currentDate: Date) {
    return setCurrentDate((prev) => addMonths(currentDate, 1));
  }
  const dayz = getDayz(currentDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/shiftpatterns");
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentDate]);

  console.log(selectedDay);

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <Header
        currentDate={currentDate}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <div className="//max-h-[400px] //overflow-y-scroll relative shadow ring-1 ring-black/5 lg:flex lg:flex-auto lg:flex-col">
        <DayHeader />
        <div className="flex bg-gray-200 text-xs/6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {dayz.map((day) => (
              <div
                key={day.date}
                className={cn(
                  isThisMonth(day.date)
                    ? "bg-white"
                    : "bg-gray-50 text-gray-500",
                  "relative px-3 py-2",
                )}
                onClick={() => setSelectedDay((prev) => day)}
              >
                <time
                  dateTime={day.date}
                  className={
                    isToday(day.date)
                      ? "flex size-6 items-center justify-center rounded-full bg-vodafone-600 font-semibold text-white"
                      : undefined
                  }
                >
                  {format(day.date, "d")}
                  {/* {day.date.split("-").pop().replace(/^0/, "")} */}
                </time>
                {day.events.length > 0 && (
                  <ol className="mt-2">
                    {day.events.slice(0, 5).map((event) => (
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
                    {day.events.length > 5 && (
                      <li className="text-gray-500">
                        + {day.events.length - 2} more
                      </li>
                    )}
                  </ol>
                )}
              </div>
            ))}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
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
                <span className="sr-only">{day.events.length} events</span>
                {day.events.length > 0 && (
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
          </div>
        </div>
      </div>
      {/* {selectedDay?.events.length > 0 && (
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
