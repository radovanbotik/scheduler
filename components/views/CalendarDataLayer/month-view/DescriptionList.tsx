import { ShiftWithDetails } from "@/app/api/getShifts/route";
import { Avatar } from "@/components/shared/Avatar";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export function DescriptionList({ ShiftAssignments }: ShiftWithDetails) {
  return (
    <ul role="list" className="min-h-48 divide-y divide-vodafone-gray-100">
      {ShiftAssignments.map((assignment) => (
        <li
          key={assignment.assignment_id}
          className="flex justify-between gap-x-6 py-5"
        >
          <div className="flex min-w-0 gap-x-4">
            {/* <img
              alt=""
              src={assignment.imageUrl}
              className="size-12 flex-none rounded-full bg-gray-50"
            /> */}
            <Avatar className="size-12 flex-none rounded-md bg-vodafone-gray-50" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">
                <a href={assignment.user.username} className="hover:underline">
                  {assignment.user.username}
                </a>
              </p>
              <p className="mt-1 flex text-xs/5 text-gray-500">
                <a
                  href={`mailto:${assignment.user.email}`}
                  className="truncate hover:underline"
                >
                  {assignment.user.email}
                </a>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-6">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900">{assignment.shift_role}</p>
              {/* {assignment.lastSeen ? (
                <p className="mt-1 text-xs/5 text-gray-500">
                  Last seen{" "}
                  <time dateTime={assignment.lastSeenDateTime}>
                    {assignment.lastSeen}
                  </time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="size-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs/5 text-gray-500">Online</p>
                </div>
              )} */}
            </div>
            <Menu as="div" className="relative flex-none">
              <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-vodafone-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link
                    href={`/users/${assignment.user.user_id}/profile`}
                    className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                  >
                    View profile
                    <span className="sr-only">
                      , {assignment.user.username}
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                  >
                    Message
                    <span className="sr-only">, {assignment.user.email}</span>
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
  );
}
