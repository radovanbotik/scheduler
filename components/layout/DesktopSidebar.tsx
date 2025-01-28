import { User } from "@prisma/client";

import Link from "next/link";
import { Navlink } from "../shared/Navlink";

import {
  CalendarIcon,
  HomeIcon,
  UsersIcon,
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

type TDesktopView = {
  user: User;
  closeSidebar: () => void;
  sidebarOpen: boolean;
};

export function DesktopSidebar({
  user,
  closeSidebar,
  sidebarOpen,
}: TDesktopView) {
  return (
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
  );
}
