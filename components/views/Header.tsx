"use client";

import { cn } from "@/lib/utility/cn";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { format } from "date-fns";

type THeader = {
  currentDate: Date;
  prevMonth: (date: Date) => void;
  nextMonth: (date: Date) => void;
};

export function Header({ currentDate, prevMonth, nextMonth }: THeader) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
      <h1 className="text-base font-semibold text-gray-900">
        <time dateTime="2022-01">{format(currentDate, "MMMM yyyy")}</time>
      </h1>
      <div className="flex items-center">
        <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <button
            type="button"
            className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            onClick={() => prevMonth(currentDate)}
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
            onClick={() => nextMonth(currentDate)}
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
  );
}
