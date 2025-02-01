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

export function StatsWorkingDays() {
  return (
    <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="//flex-wrap flex flex-col items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
        >
          <dt className="text-sm/6 font-medium text-gray-500">{stat.name}</dt>
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
