"use client";

import { cn } from "@/lib/utility/cn";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
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

export default function MonthView() {
  const [currentDate, setCurrentDate] = useState(new Date());

  function getDaysInMonth(date: Date) {
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);
    return eachDayOfInterval({ start: startDate, end: endDate });
  }
  const onlyDays = getDaysInMonth(new Date());
  const days = onlyDays.map((day) => {
    return {
      date: day.toDateString(),
      events: [],
      isCurrentMonth: true,
    };
  });

  function prevMonth() {
    return setCurrentDate((prev) => subMonths(currentDate, 1));
  }

  function nextMonth() {
    return setCurrentDate((prev) => addMonths(currentDate, 1));
  }

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

  const dayz = getDayz(currentDate);
  console.log(dayz);

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
        <h1 className="text-base font-semibold text-gray-900">
          <time dateTime="2022-01">{format(currentDate, "MMMM yyyy")}</time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
              onClick={() => prevMonth()}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
            >
              {format(currentDate, "MMMM")}
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
              onClick={() => nextMonth()}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" className="relative">
              <MenuButton
                type="button"
                className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Month view
                <ChevronDownIcon
                  className="-mr-1 size-5 text-gray-400"
                  aria-hidden="true"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                      Day view
                    </a>
                  </MenuItem>

                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                      Month view
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                      Year view
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <button
              type="button"
              className="ml-6 rounded-md bg-vodafone-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-vodafone-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vodafone-600"
            >
              Add event
            </button>
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="size-5" aria-hidden="true" />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Create event
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Go to today
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Day view
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Week view
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Month view
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Year view
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </header>
      <div className="//max-h-[400px] //overflow-y-scroll relative shadow ring-1 ring-black/5 lg:flex lg:flex-auto lg:flex-col">
        <div className="//sticky //left-0 //top-0 //z-10 //justify-self-start grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs/6 font-semibold text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
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
                  (day.isSelected || isToday(day.date)) && "font-semibold",
                  day.isSelected && "text-white",
                  !day.isSelected && isToday(day.date) && "text-vodafone-600",
                  !day.isSelected &&
                    isThisMonth(day.date) &&
                    !isToday(day.date) &&
                    "text-gray-900",
                  !day.isSelected &&
                    !isThisMonth(day.date) &&
                    !isToday(day.date) &&
                    "text-gray-500",
                  "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10",
                )}
              >
                <time
                  dateTime={day.date}
                  className={cn(
                    day.isSelected &&
                      "flex size-6 items-center justify-center rounded-full",
                    day.isSelected && isToday(day.date) && "bg-vodafone-600",
                    day.isSelected && !isToday(day.date) && "bg-gray-900",
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
