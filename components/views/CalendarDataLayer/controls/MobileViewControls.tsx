import { cn } from "@/lib/utility/cn";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type TMobileViewControls = {
  isAdmin: boolean;
};

export function MobileViewControls({ isAdmin }: TMobileViewControls) {
  return (
    <Menu as="div" className="relative ml-6 md:hidden">
      <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
        <span className="sr-only">Open menu</span>
        <EllipsisHorizontalIcon className="size-5" aria-hidden="true" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-20 mt-3 w-36 origin-top-right divide-y divide-vodafone-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {isAdmin && (
          <div className="py-1">
            <MenuItem>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
              >
                Create event
              </Link>
            </MenuItem>
          </div>
        )}

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
              My view
            </Link>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
