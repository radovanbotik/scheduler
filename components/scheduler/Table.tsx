import { shiftPatterns } from "@/data/shifts";
import { users } from "@/data/users";
import { cn } from "@/lib/utility/cn";
import { getDaysInMonth, getWeekdayName } from "@/lib/utility/date";
import { ReactNode } from "react";

function Avatar() {
  return (
    <span className="inline-block size-6 overflow-hidden rounded-full bg-gray-100">
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="size-full text-gray-300"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  );
}

function Cell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("min-h-20", className)}>{children}</div>;
}

export function Table() {
  return (
    <div className="overflow-x-auto">
      {/* LEGEND */}
      <div className="inline-grid grid-cols-[120px_repeat(30,_100px)] gap-1 [&>*]:border [&>*]:border-gray-300">
        <div className="sticky left-0 z-10 bg-white">SHIFT</div>
        {getDaysInMonth(2025, 5).map((day) => (
          <Cell key={day.getDate()}>
            <div className="flex flex-col">
              <div>{day.getDate()}</div>
              <div>{getWeekdayName(day)}</div>
            </div>
          </Cell>
        ))}
      </div>
      {/* DATA */}
      {shiftPatterns.map((pattern) => (
        <div
          key={pattern.pattern_id}
          className="inline-grid grid-cols-[120px_repeat(30,_100px)] gap-1 [&>*]:border [&>*]:border-gray-300"
        >
          <div className="sticky left-0 z-10 bg-white">
            <div>{pattern.name}</div>
            <div>
              <span>{pattern.start_time}</span>
              <span> - </span>
              <span>{pattern.end_time}</span>
            </div>
          </div>
          {getDaysInMonth(2025, 5).map((day) => (
            <Cell
              key={day.getDate()}
              className={`${(pattern.name === "Morning" && "bg-orange-500") || (pattern.name === "Early Day" && "bg-sky-500") || (pattern.name === "Standard Day" && "bg-green-500") || (pattern.name === "Evening" && "bg-yellow-500") || (pattern.name === "Night" && "bg-stone-500")}`}
            >
              <div className="flex flex-col">
                <div className="truncate">{users[0].username}</div>
                <div className="truncate">{users[1].username}</div>
                {pattern.pattern_id === 2 && (
                  <>
                    <div className="truncate">{users[2].username}</div>
                    <div className="truncate">{users[4].username}</div>
                  </>
                )}
              </div>
            </Cell>
          ))}
        </div>
      ))}
    </div>
  );
}
