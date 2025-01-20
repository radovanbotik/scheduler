import { cn } from "@/lib/utility/cn";
import { formatDate, getDaysInMonth, getWeekdayName } from "@/lib/utility/date";
import { prisma } from "@/prisma/prisma";
import { ReactNode } from "react";
import { Badge } from "../shared/Badge";

function Cell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("//px-0.5 h-20 shadow-sm", className)}>{children}</div>
  );
}

export async function Table() {
  const shiftPatterns = await prisma.shiftPattern.findMany();

  const shifts = await prisma.shift.findMany({
    include: {
      ShiftAssignments: {
        include: { user: true },
      },
    },
  });

  function getShiftColor(shiftName: string) {
    return SHIFT_COLORS[shiftName] ?? "";
  }

  const SHIFT_COLORS: Record<string, string> = {
    "Early Morning": "bg-orange-300",
    Morning: "bg-sky-300",
    "Standard Day": "bg-green-300",
    Afternoon: "bg-yellow-300",
    Night: "bg-stone-300",
  };

  return (
    <div className="space-y-4">
      <div className="text-center text-3xl font-bold">
        {new Date(2025, 0).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </div>

      <div className="overflow-x-auto text-sm">
        {/* LEGEND */}
        <div
          className={cn(
            "gapx-0.5 inline-grid [&>*]:border [&>*]:border-gray-300",
          )}
          style={{
            gridTemplateColumns: `120px repeat(${getDaysInMonth(2025, 0).length}, 120px)`,
          }}
        >
          <Cell className="sticky left-0 z-10 flex size-full bg-white px-0.5 font-bold shadow-sm">
            Shift
          </Cell>
          {getDaysInMonth(2025, 0).map((day) => (
            <Cell key={day.getDate()} className="h-12">
              <div className="flex size-full flex-col items-center text-center font-bold">
                <div className="w-full bg-neutral-600 text-white">
                  {getWeekdayName(day)}
                </div>
                <div className="text-xs">{formatDate(day)}</div>
              </div>
            </Cell>
          ))}
        </div>
        {/* DATA */}
        {shiftPatterns.map((pattern) => (
          <div
            key={pattern.pattern_id}
            className={cn("inline-grid [&>*]:border [&>*]:border-gray-300")}
            style={{
              gridTemplateColumns: `120px repeat(${getDaysInMonth(2025, 0).length}, 120px)`,
            }}
          >
            <Cell className="sticky left-0 bg-white px-0.5 shadow-sm">
              <div className="font-bold">{pattern.shift_name}</div>
              <div>
                <span>{pattern.start_time}</span>
                <span> - </span>
                <span>{pattern.end_time}</span>
              </div>
            </Cell>
            {getDaysInMonth(2025, 0).map((day) => {
              // Find the shift for this day & pattern (assuming only one per day/pattern)
              const matchedShift = shifts.find(
                (shift) =>
                  shift.shift_date.getTime() === day.getTime() &&
                  shift.pattern_id === pattern.pattern_id,
              );

              // Separate assignments by role
              const qmslAssignments =
                matchedShift?.ShiftAssignments.filter(
                  (assignment) =>
                    assignment.shift_role === "QM" ||
                    assignment.shift_role === "SL" ||
                    assignment.shift_role === "ASL" ||
                    assignment.shift_role === "CI" ||
                    assignment.shift_role === "TR",
                ) ?? [];

              const otherAssignments =
                matchedShift?.ShiftAssignments.filter(
                  (assignment) =>
                    assignment.shift_role !== "QM" &&
                    assignment.shift_role !== "SL" &&
                    assignment.shift_role !== "ASL" &&
                    assignment.shift_role !== "CI" &&
                    assignment.shift_role !== "TR",
                ) ?? [];

              return (
                <Cell
                  key={day.getDate()}
                  className={getShiftColor(pattern.shift_name)}
                >
                  <div className="grid grid-cols-2">
                    {/* Render QM/SL assignments */}
                    {qmslAssignments.map((assignment) => (
                      <Badge key={assignment.assignment_id}>
                        <span className="font-bold">
                          {assignment.shift_role}
                        </span>
                        <span className="mx-0.5"> - </span>
                        <span className="capitalize">
                          {assignment.user.username}
                        </span>
                      </Badge>
                    ))}

                    {/* Render a badge if we have "other" assignments */}
                    {otherAssignments.length > 0 && (
                      <Badge>
                        <span className="capitalize">
                          + {otherAssignments.length} More
                        </span>
                      </Badge>
                    )}
                  </div>
                </Cell>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
