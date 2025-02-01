import { cn } from "@/lib/utility/cn";

const stats = [
  {
    name: "Total Days Off",
    count: "10",
    shiftType: "positive",
  },
  {
    name: "Vacation",
    count: "5",
    shiftType: "negative",
  },
  {
    name: "Sick Leave",
    count: "0",
    shiftType: "positive",
  },
];

const SHIFT_COLORS: Record<string, { base: string; hover: string }> = {
  "Total Days Off": {
    base: "bg-emerald-200 text-emerald-500",
    hover: "hover:bg-emerald-200 hover:text-emerald-600",
  },
  Vacation: {
    base: "bg-amber-200 text-amber-500",
    hover: "hover:bg-amber-200 hover:text-amber-600",
  },
  "Sick Leave": {
    base: "bg-red-200 text-red-500",
    hover: "hover:bg-red-200 hover:text-red-600",
  },
};

export function getShiftStyles(shiftName: string) {
  return SHIFT_COLORS[shiftName] ?? { base: "", hover: "" };
}

export function StatsDaysOff() {
  return (
    <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-3 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className={cn(
            "//flex-wrap flex flex-col items-center justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 text-center sm:px-6 xl:px-8",
            getShiftStyles(stat.name).base,
            getShiftStyles(stat.name).hover,
          )}
        >
          <dt className="text-sm/6 font-medium text-gray-500">{stat.name}</dt>

          <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
            {stat.count}
          </dd>
        </div>
      ))}
    </dl>
  );
}
