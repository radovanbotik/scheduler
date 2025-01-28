import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function DesktopViewControl() {
  return (
    <Menu as="div" className="relative hidden md:ml-4 md:block">
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
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Team view
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              My View
            </Link>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
