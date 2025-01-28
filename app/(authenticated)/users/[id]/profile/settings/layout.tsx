import {
  BellIcon,
  FingerPrintIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utility/cn";
import { Navlink } from "@/components/shared/Navlink";

export default async function layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) {
  const id = (await params).id;

  const secondaryNavigation = [
    {
      name: "Profile",
      href: `/users/${id}/profile/settings/general`,
      icon: UserCircleIcon,
      current: true,
    },
    {
      name: "Security",
      href: `/users/${id}/profile/settings/security`,
      icon: FingerPrintIcon,
      current: false,
    },
    {
      name: "Notifications",
      href: `/users/${id}/profile/settings/notifications`,
      icon: BellIcon,
      current: false,
    },
  ];
  return (
    <>
      <div className="mx-auto space-y-8 lg:flex lg:gap-x-8 lg:space-y-0">
        <aside className="flex overflow-x-auto border-b border-vodafone-gray-900/5 lg:block lg:w-64 lg:flex-none lg:border-0">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul
              role="list"
              className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
            >
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <Navlink
                    href={item.href}
                    activeStyles="bg-gray-50 text-vodafone-600 active"
                    inactiveStyles="text-gray-700 hover:bg-gray-50 hover:text-vodafone-600"
                    className="group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm/6 font-semibold"
                    name={item.name}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={cn(
                        "text-gray-400 group-hover:text-vodafone-600",
                        "size-6 shrink-0",
                        "group-[.active]:text-vodafone-600",
                      )}
                    />
                  </Navlink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {children}
      </div>
    </>
  );
}
