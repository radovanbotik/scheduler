import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { User } from "@prisma/client";
import Link from "next/link";
import { Navlink } from "../shared/Navlink";

import {
  CalendarIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

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

type TMobileView = {
  user: User;
  closeSidebar: () => void;
  sidebarOpen: boolean;
};

export function MobileSidebar({
  user,
  closeSidebar,
  sidebarOpen,
}: TMobileView) {
  return (
    <Dialog
      open={sidebarOpen}
      onClose={closeSidebar}
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
                onClick={closeSidebar}
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
                  <li key={item.name} onClick={closeSidebar}>
                    <Navlink
                      href={item.href}
                      name={item.name}
                      activeStyles="bg-vodafone-gray-800 text-white"
                      inactiveStyles="text-vodafone-gray-400 hover:bg-vodafone-gray-800 hover:text-white"
                    >
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
  );
}
