import { cn } from "@/lib/utility/cn";
import { Navlink } from "../shared/Navlink";

const tabs = [
  { name: "Working Days", href: "/dashboard/working-days", current: true },
  { name: "Days off", href: "/dashboard/days-off", current: false },
];

export default function SectionHeader() {
  return (
    <div className="border-b border-gray-200">
      <div className="px-4 sm:flex sm:items-baseline sm:px-6 xl:px-8">
        <h3 className="text-base font-semibold text-gray-900">Month Summary</h3>
        <div className="mt-4 sm:ml-10 sm:mt-0">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <Navlink
                key={tab.name}
                href={tab.href}
                activeStyles="border-indigo-500 text-indigo-600"
                inactiveStyles="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                aria-current={tab.current ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-none border-b-2 px-1 pb-4 text-sm font-medium",
                )}
              >
                {tab.name}
              </Navlink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
