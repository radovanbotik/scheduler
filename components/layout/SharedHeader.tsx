import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { User } from "@prisma/client";

import { ProfileDropdown } from "./ProfileDropdown";

type TSharedHeader = {
  user: User;
  closeSidebar: () => void;
  openSidebar: () => void;
  sidebarOpen: boolean;
};

export function SharedHeader({
  user,
  closeSidebar,
  openSidebar,
  sidebarOpen,
}: TSharedHeader) {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-vodafone-gray-200 bg-vodafone-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:bg-white lg:px-8">
      <button
        type="button"
        onClick={openSidebar}
        className="-m-2.5 p-2.5 text-white lg:hidden lg:text-gray-700"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon aria-hidden="true" className="size-6" />
      </button>

      {/* Separator */}
      <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

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
          <ProfileDropdown user={user} />
        </div>
      </div>
    </div>
  );
}
