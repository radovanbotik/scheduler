import { Avatar } from "@/components/shared/Avatar";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Senior",
    imageUrl:
      "https://images.unsplash.com/photo-1603415526960-faa30bd1a69d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "/users/leslie-alexander/profile",
    lastSeen: "2h ago",
    lastSeenDateTime: "2025-01-21T11:23Z",
  },
  {
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "Junior",
    imageUrl:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a0?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "/users/michael-brown/profile",
    lastSeen: "1h ago",
    lastSeenDateTime: "2025-01-21T12:23Z",
  },
  {
    name: "Emily Carter",
    email: "emily.carter@example.com",
    role: "Team Leader",
    imageUrl:
      "https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "/users/emily-carter/profile",
    lastSeen: "30m ago",
    lastSeenDateTime: "2025-01-21T12:53Z",
  },
  {
    name: "David Evans",
    email: "david.evans@example.com",
    role: "Junior",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "/users/david-evans/profile",
    lastSeen: "4h ago",
    lastSeenDateTime: "2025-01-21T09:23Z",
  },
  {
    name: "Sarah Phillips",
    email: "sarah.phillips@example.com",
    role: "Senior",
    imageUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "/users/sarah-phillips/profile",
    lastSeen: "1d ago",
    lastSeenDateTime: "2025-01-20T14:23Z",
  },
  {
    name: "James Turner",
    email: "james.turner@example.com",
    role: "Team Leader",
    imageUrl:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "/users/james-turner/profile",
    lastSeen: "45m ago",
    lastSeenDateTime: "2025-01-21T12:38Z",
  },
  {
    name: "Olivia Wilson",
    email: "olivia.wilson@example.com",
    role: "Junior",
    imageUrl:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "/users/olivia-wilson/profile",
    lastSeen: "2d ago",
    lastSeenDateTime: "2025-01-19T13:23Z",
  },
  {
    name: "Ryan Young",
    email: "ryan.young@example.com",
    role: "Senior",
    imageUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "/users/ryan-young/profile",
    lastSeen: "5h ago",
    lastSeenDateTime: "2025-01-21T08:23Z",
  },
  {
    name: "Ava Hernandez",
    email: "ava.hernandez@example.com",
    role: "Team Leader",
    imageUrl:
      "https://images.unsplash.com/photo-1502764613149-7f1d229e2309?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "/users/ava-hernandez/profile",
    lastSeen: "3d ago",
    lastSeenDateTime: "2025-01-18T13:23Z",
  },
  {
    name: "Ethan Kim",
    email: "ethan.kim@example.com",
    role: "Junior",
    imageUrl:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "/users/ethan-kim/profile",
    lastSeen: "6h ago",
    lastSeenDateTime: "2025-01-21T07:23Z",
  },
];

export default function Example() {
  return (
    <div className="//lg:mt-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-0">
        <h2 className="text-balance font-semibold tracking-tight text-gray-900 sm:text-2xl">
          Team Inventory
        </h2>
        <ul role="list" className="mt-10 divide-y divide-gray-100">
          {people.map((person) => (
            <li
              key={person.email}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <Avatar className="size-12 flex-none rounded-md bg-gray-50" />

                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-900">
                    <a href={person.href} className="hover:underline">
                      {person.name}
                    </a>
                  </p>
                  <p className="mt-1 flex text-xs/5 text-gray-500">
                    <a
                      href={`mailto:${person.email}`}
                      className="truncate hover:underline"
                    >
                      {person.email}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm/6 text-gray-900">{person.role}</p>
                  {person.lastSeen ? (
                    <p className="mt-1 text-xs/5 text-gray-500">
                      Last seen{" "}
                      <time dateTime={person.lastSeenDateTime}>
                        {person.lastSeen}
                      </time>
                    </p>
                  ) : (
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="size-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs/5 text-gray-500">Online</p>
                    </div>
                  )}
                </div>
                <Menu as="div" className="relative flex-none">
                  <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon
                      aria-hidden="true"
                      className="size-5"
                    />
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <a
                        href={person.href}
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                      >
                        View profile
                        <span className="sr-only">, {person.name}</span>
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                      >
                        Message<span className="sr-only">, {person.name}</span>
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
