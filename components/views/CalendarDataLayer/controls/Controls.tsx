"use client";

import { cn } from "@/lib/utility/cn";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { addMonths, format, subMonths } from "date-fns";
import { useRouter } from "next/navigation";
import { DateControls } from "./DateControls";

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

  return (
    <header className="//px-6 flex items-center justify-between border-b border-vodafone-gray-200 py-4 lg:flex-none">
      <h1 className="text-base font-semibold text-gray-900">
        <time dateTime="2022-01">{format(currentDate, "MMMM yyyy")}</time>
      </h1>
      <div className="flex items-center">
        <DateControls
          currentDate={currentDate}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />

        {/* VIEW SELECTOR */}
        {/* <Menu as="div" className="relative hidden md:ml-4 md:block">
          <MenuButton
            type="button"
            className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-vodafone-gray-300 hover:bg-gray-50"
          >
            Team view
            <ChevronDownIcon
              className="-mr-1 size-5 text-gray-400"
              aria-hidden="true"
            />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-20 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                >
                  Team view
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                >
                  My View
                </a>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu> */}

        {/* SEPARATOR */}
        <div className="ml-6 h-6 w-px bg-gray-300" />

        {/* ADMIN ONLY ---- ADD BUTTON */}
        {/* <button
          type="button"
          className="ml-6 rounded-md bg-vodafone-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-vodafone-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vodafone-600"
        >
          Add event
        </button> */}

        {/* MOBILE MENU WITH OPTIONS */}
        {/* <Menu as="div" className="relative ml-6 md:hidden">
          <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open menu</span>
            <EllipsisHorizontalIcon className="size-5" aria-hidden="true" />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-20 mt-3 w-36 origin-top-right divide-y divide-vodafone-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
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
        </Menu> */}
      </div>
    </header>
  );
}
