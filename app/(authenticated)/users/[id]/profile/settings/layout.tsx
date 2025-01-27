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
  console.log(id);

  const secondaryNavigation = [
    {
      name: "General",
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
    <div className="//lg:mt-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-0">
        {/* <h2 className="text-balance font-semibold tracking-tight text-gray-900 sm:text-2xl">
        Profile settings
      </h2> */}

        <div className="//lg:px-8 mx-auto mt-10 lg:flex lg:gap-x-16">
          <aside className="//lg:py-20 flex overflow-x-auto border-b border-vodafone-gray-900/5 py-6 lg:block lg:w-64 lg:flex-none lg:border-0">
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
      </div>
    </div>
  );
}
