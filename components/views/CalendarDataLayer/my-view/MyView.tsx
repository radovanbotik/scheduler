"use client";

import { useState } from "react";
import { isSameDay, isSameMonth, isToday, format } from "date-fns";
import { ShiftPattern } from "@prisma/client";
import { ShiftWithDetails } from "@/app/api/getShifts/route";
import { cn } from "@/lib/utility/cn";
import { Modal } from "@/components/shared/Modal";
import { getCalendarDays } from "@/lib/utility/calendar";
import { DaysOfWeek } from "../team-view/DaysOfWeek";
import { DescriptionList } from "../team-view/DescriptionList";
import { AgentShift } from "@/app/(authenticated)/schedule/my-view/page";

type MonthViewProps = {
  currentDate: Date;
  shiftPatterns: ShiftPattern[];
  shifts: ShiftWithDetails[];
  agentShifts: AgentShift[];
};

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

export function MyView({
  currentDate: serverDate,
  agentShifts,
  shiftPatterns,
  shifts,
}: MonthViewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<ShiftWithDetails>();

  // Pre-map agent shifts to calendar days for quick lookup
  const agentShiftsByDate = agentShifts.reduce<Record<string, AgentShift>>(
    (acc, shift) => {
      const dayKey = format(shift.shift_date, "yyyy-MM-dd");
      acc[dayKey] = shift;
      return acc;
    },
    {},
  );

  // Modal open handler
  const openModal = (shift: ShiftWithDetails) => {
    setSelectedShift(shift);
    setIsOpen(true);
  };

  // Get calendar days for the current month
  const calendarDays = getCalendarDays(serverDate);

  return (
    <>
      <div className="relative shadow ring-1 ring-black/5 lg:flex lg:h-[calc(100vh-181px)] lg:flex-auto lg:flex-col lg:overflow-y-auto">
        <DaysOfWeek />
        <div className="isolate flex bg-vodafone-gray-200 text-xs/6 text-gray-700 lg:flex-auto">
          {/* Desktop View */}
          <div className="isolate hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {calendarDays.map((day) => {
              const dayKey = format(day, "yyyy-MM-dd");
              const shift = agentShiftsByDate[dayKey];

              return (
                <div
                  key={dayKey}
                  className={cn(
                    isSameMonth(day, serverDate)
                      ? "bg-white"
                      : "bg-vodafone-gray-50 text-gray-500",
                    "relative space-y-1 px-3 py-2",
                  )}
                >
                  <time
                    dateTime={dayKey}
                    className={cn(
                      "mx-auto flex items-center justify-center",
                      isToday(day)
                        ? "flex size-6 items-center justify-center rounded-full bg-vodafone-600 font-semibold text-white"
                        : "",
                    )}
                  >
                    {format(day, "d")}
                  </time>

                  {shift && (
                    <button
                      //   className="group flex w-full flex-col"

                      className={cn(
                        "group flex w-full flex-col",
                        getShiftStyles(shift.pattern.shift_name).base,
                        getShiftStyles(shift.pattern.shift_name).hover,
                      )}
                      onClick={() => {
                        if (shift) {
                          const selected = shifts.find(
                            (s) => s.shift_id === shift.shift_id,
                          );
                          if (selected) {
                            openModal(selected);
                          }
                        }
                      }}
                    >
                      <div className="w-full truncate text-center font-medium">
                        {shift.pattern.shift_name}
                      </div>
                      <div className="hidden w-full xl:block">
                        {shift.pattern.start_time} - {shift.pattern.end_time}
                      </div>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile View */}
          <div className="grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {calendarDays.map((day) => {
              const dayKey = format(day, "yyyy-MM-dd");
              const shift = agentShiftsByDate[dayKey];

              return (
                <button
                  key={dayKey}
                  className={cn(
                    isSameMonth(day, serverDate) ? "bg-white" : "bg-gray-50",
                    isToday(day) && "font-semibold text-vodafone-600",
                    !isToday(day) &&
                      isSameMonth(day, serverDate) &&
                      "text-gray-900",
                    !isSameMonth(day, serverDate) && "text-gray-500",
                    "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10",
                  )}
                  onClick={() => {
                    if (shift) {
                      const selected = shifts.find(
                        (s) => s.shift_id === shift.shift_id,
                      );
                      if (selected) {
                        openModal(selected);
                      }
                    }
                  }}
                >
                  <time
                    dateTime={dayKey}
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full",
                      isToday(day) && "bg-vodafone-600 text-white",
                      !isToday(day) && "bg-gray-900 text-white",
                      "ml-auto",
                    )}
                  >
                    {format(day, "d")}
                  </time>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedShift && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={format(selectedShift.shift_date, "iiii do LLLL yyyy")}
          description={
            <>
              <p>{selectedShift.pattern.shift_name} Shift</p>
              <p className="text-sm">
                {selectedShift.pattern.start_time} -{" "}
                {selectedShift.pattern.end_time}
              </p>
            </>
          }
        >
          <DescriptionList {...selectedShift} />
        </Modal>
      )}
    </>
  );
}
