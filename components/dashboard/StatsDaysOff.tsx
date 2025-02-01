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

export function StatsDaysOff() {
  return (
    <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-3 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="//flex-wrap flex flex-col items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
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
