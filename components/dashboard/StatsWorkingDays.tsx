import { cn } from "@/lib/utility/cn";

const stats = [
  {
    name: "Early Morning",
    count: "10",
    shift: "06:00 - 15:00",
    shiftType: "positive",
  },
  {
    name: "Morning",
    count: "5",
    shift: "07:00 - 16:00",
    shiftType: "negative",
  },
  {
    name: "Standard Day",
    count: "0",
    shift: "09:00 - 18:00",
    shiftType: "positive",
  },
  {
    name: "Afternoon",
    count: "4",
    shift: "13:00 - 22:00",
    shiftType: "negative",
  },
  {
    name: "Night",
    count: "1",
    shift: "21:30 - 06:30",
    shiftType: "negative",
  },
];

const SHIFT_COLORS: Record<string, { base: string; hover: string }> = {
  "Early Morning": {
    base: "bg-orange-200 text-orange-500",
    hover: "hover:bg-orange-200 hover:text-orange-600",
  },
  Morning: {
    base: "bg-sky-200 text-sky-500",
    hover: "hover:bg-sky-200 hover:text-sky-600",
  },
  "Standard Day": {
    base: "bg-green-200 text-green-500",
    hover: "hover:bg-green-200 hover:text-green-600",
  },
  Afternoon: {
    base: "bg-yellow-200 text-yellow-500",
    hover: "hover:bg-yellow-200 hover:text-yellow-600",
  },
  Night: {
    base: "bg-stone-200 text-stone-500",
    hover: "hover:bg-stone-200 hover:text-stone-600",
  },
};

export function getShiftStyles(shiftName: string) {
  return SHIFT_COLORS[shiftName] ?? { base: "", hover: "" };
}

export function StatsWorkingDays() {
  return (
    <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className={cn(
            "//flex-wrap flex flex-col items-center justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 text-center sm:px-6 xl:px-8",
            getShiftStyles(stat.name).base,
            getShiftStyles(stat.name).hover,
          )}
        >
          <dt className="//text-gray-500 text-sm/6 font-medium">{stat.name}</dt>
          {/* <dd
            className={cn("text-xs font-medium text-gray-700")}
            // className={cn(
            //   stat.shiftType === "negative"
            //     ? "text-rose-600"
            //     : "text-gray-700",
            //   "text-xs font-medium",
            // )}
          >
            {stat.shift}
          </dd> */}
          <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
            {stat.count}
          </dd>
        </div>
      ))}
    </dl>
  );
}
