"use client";

import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  ChevronRightIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { cn } from "@/lib/utility/cn";
import { Avatar } from "../shared/Avatar";
import { Navlink } from "../shared/Navlink";
import Link from "next/link";
import { NavlinkWithTooltip } from "../shared/NavlinkWithTooltip";

const pages = [
  { name: "Projects", href: "#", current: false },
  { name: "Project Nero", href: "#", current: true },
];

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Schedule", href: "/schedule", icon: ClockIcon },
  {
    name: "Holiday Planner",
    href: "/holiday-planner",
    icon: CalendarIcon,
  },
  {
    name: "Office Days",
    href: "/office-days",
    icon: BuildingOffice2Icon,
  },
  { name: "Team", href: "/team", icon: UsersIcon },
  { name: "FAQ", href: "/faq", icon: QuestionMarkCircleIcon },
];
const userNavigation = [
  { name: "Your profile", href: "/users/random-id/profile/" },
  { name: "Account settings", href: "/users/random-id/profile/settings" },
  { name: "Sign out", href: "#" },
];

export default function RLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-vodafone-gray-900 px-6 pb-2 ring-1 ring-white/10">
              <div className="relative flex h-16 shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://res.cloudinary.com/dso5xe3t4/image/upload/v1737455098/iot/Vodafone-logo_ezldfd.png"
                  className="h-8 w-auto"
                />
                <Link href={"/"} className="absolute size-full" />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="-mx-2 flex-1 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name} onClick={() => setSidebarOpen(false)}>
                      <Navlink
                        href={item.href}
                        name={item.name}
                        activeStyles="bg-vodafone-gray-800 text-white"
                        inactiveStyles="text-vodafone-gray-400 hover:bg-vodafone-gray-800 hover:text-white"
                      >
                        {/* {item.name} */}
                        <item.icon className="size-6 shrink-0" />
                      </Navlink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="//lg:overflow-y-auto hidden h-full overflow-hidden overflow-x-hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:bg-vodafone-gray-900 lg:pb-4">
        <div className="relative flex h-16 shrink-0 items-center justify-center">
          <img
            alt="Your Company"
            src="https://res.cloudinary.com/dso5xe3t4/image/upload/v1737455098/iot/Vodafone-logo_ezldfd.png"
            className="//object-contain h-8 w-auto"
          />
          <Link href={"/"} className="absolute size-full" />
        </div>
        <nav className="mt-8">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Navlink
                  activeStyles="bg-vodafone-gray-800 text-white"
                  inactiveStyles="text-vodafone-gray-400 hover:bg-vodafone-gray-800 hover:text-white"
                  href={item.href}
                  className="group flex gap-x-3 rounded-md p-3 text-sm/6 font-semibold"
                  // icon={item.icon}
                  // // tooltip={item.name}
                >
                  <item.icon className="size-6 shrink-0" />
                </Navlink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="lg:pl-20">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-vodafone-gray-200 bg-vodafone-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:bg-white lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-white lg:hidden lg:text-gray-700"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>

          {/* Separator */}
          <div
            aria-hidden="true"
            className="h-6 w-px bg-gray-900/10 lg:hidden"
          />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form action="#" method="GET" className="grid flex-1 grid-cols-1">
              <input
                name="search"
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="col-start-1 row-start-1 block size-full bg-vodafone-gray-800 pl-8 text-base text-white outline-none placeholder:text-white sm:text-sm/6 lg:bg-white lg:text-gray-900 lg:placeholder:text-gray-400"
              />
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-50 lg:text-gray-400"
              />
            </form>
            {/* <nav aria-label="Breadcrumb" className="flex flex-1">
              <ol role="list" className="flex items-center space-x-4">
                {pages.map((page, i) => (
                  <li key={page.name}>
                    <div className="flex items-center">
                      {i >= 1 && (
                        <ChevronRightIcon
                          aria-hidden="true"
                          className="size-5 shrink-0 text-gray-400"
                        />
                      )}
                      <a
                        href={page.href}
                        aria-current={page.current ? "page" : undefined}
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        {page.name}
                      </a>
                    </div>
                  </li>
                ))}
              </ol>
            </nav> */}
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-white hover:text-gray-500 lg:text-gray-400"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>

              {/* Separator */}
              <div
                aria-hidden="true"
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
              />

              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <MenuButton className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <Avatar />
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      aria-hidden="true"
                      className="ml-4 text-sm/6 font-semibold text-gray-900"
                    >
                      Radovan
                    </span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="ml-2 size-5 text-gray-400"
                    />
                  </span>
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-vodafone-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <Link
                        href={item.href}
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                      >
                        {item.name}
                        {/* <item.icon className="size-6 shrink-0" /> */}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <main className="//xl:pl-96">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Main area */}
            {children}
          </div>
        </main>
      </div>

      {/* <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-vodafone-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
       
        </aside> */}
    </>
  );
}
