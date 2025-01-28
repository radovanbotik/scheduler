import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Avatar } from "../shared/Avatar";
import Link from "next/link";
import { User } from "@prisma/client";

type TUser = {
  user: User;
};

export function ProfileDropdown({ user }: TUser) {
  const userNavigation = [
    { name: "Your profile", href: `/users/${user.user_id}/profile/` },
    {
      name: "Account settings",
      href: `/users/${user.user_id}/profile/settings`,
    },
    { name: "Sign out", href: "#" },
  ];

  return (
    <Menu as="div" className="relative">
      <MenuButton className="-m-1.5 flex items-center p-1.5">
        <span className="sr-only">Open user menu</span>
        <Avatar />
        <span className="hidden lg:flex lg:items-center">
          <span
            aria-hidden="true"
            className="ml-4 text-sm/6 font-semibold text-gray-900"
          >
            {user.firstName}
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
  );
}
