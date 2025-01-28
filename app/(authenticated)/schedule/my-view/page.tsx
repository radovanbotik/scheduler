"use server";

import { MonthViewSkeleton } from "@/components/views/CalendarDataLayer/month-view/MonthViewSketeleton";
import { MyView } from "@/components/views/CalendarDataLayer/my-view/MyView";
import { getCalendarDays } from "@/lib/utility/calendar";
import { prisma } from "@/prisma/prisma";
import { Suspense } from "react";

async function getShifts(date: Date) {
  if (!date) throw new Error("invalid date");

  const firstDayInMonth = getCalendarDays(date)[0];
  const lastDayInMonth =
    getCalendarDays(date)[getCalendarDays(date).length - 1];
  try {
    const shifts = await prisma.shift.findMany({
      where: {
        shift_date: {
          gte: firstDayInMonth,
          lte: lastDayInMonth,
        },
      },
      select: {
        shift_date: true,
        shift_id: true,
        pattern_id: true,
        pattern: true,
        ShiftAssignments: {
          include: {
            user: true,
          },
        },
      },
    });
    return shifts;
  } catch (error) {
    console.error("Database query error:", error);
    return [];
  }
}

async function getShiftPatterns() {
  try {
    const desiredOrder = [
      "Early Morning",
      "Morning",
      "Standard Day",
      "Afternoon",
      "Night",
    ];
    const shiftPatterns = await prisma.shiftPattern.findMany();
    return shiftPatterns.sort((a, b) => {
      return (
        desiredOrder.indexOf(a.shift_name) - desiredOrder.indexOf(b.shift_name)
      );
    });
  } catch (error) {
    console.error("Database query error:", error);
    return [];
  }
}

export type AgentShift = {
  shift_id: string;
  shift_date: Date;
  pattern: {
    pattern_id: string;
    shift_name: string;
    start_time: string;
    end_time: string;
  };
  ShiftAssignments: {
    assignment_id: string;
    user_id: string;
    shift_role: string;
    user: {
      firstName: string | null;
      lastName: string | null;
      username: string;
      profilePicture: string | null;
    };
  }[];
};

async function getAgentShifts(date: Date, agentId: string) {
  if (!date) throw new Error("Invalid date");

  const firstDayInMonth = getCalendarDays(date)[0];
  const lastDayInMonth =
    getCalendarDays(date)[getCalendarDays(date).length - 1];

  try {
    const shifts = await prisma.shift.findMany({
      where: {
        shift_date: {
          gte: firstDayInMonth,
          lte: lastDayInMonth,
        },
        ShiftAssignments: {
          some: {
            user_id: agentId, // Filter assignments for the given user
          },
        },
      },
      include: {
        ShiftAssignments: {
          where: {
            user_id: agentId,
          },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                username: true,
                profilePicture: true,
              },
            },
          },
        },
        pattern: true, // Include shift pattern details if needed
      },
    });

    return shifts;
  } catch (error) {
    console.error("Error fetching agent shifts:", error);
    return [];
  }
}

const AUTH_ID = "cm6gavqul0000vz2kcmv9q3la";

export default async function page({
  searchParams,
}: {
  searchParams?: Promise<{ date?: string }>;
}) {
  const dateParam = (await searchParams)?.date;
  const currentDate = dateParam ? new Date(dateParam) : new Date();

  const [shiftPatterns, shifts, agentShifts] = await Promise.all([
    getShiftPatterns(),
    getShifts(currentDate),
    getAgentShifts(currentDate, AUTH_ID),
  ]);

  console.log(agentShifts);

  return (
    <>
      <Suspense fallback={<MonthViewSkeleton currentDate={currentDate} />}>
        <MyView
          currentDate={currentDate}
          shiftPatterns={shiftPatterns || []}
          agentShifts={agentShifts || []}
          shifts={shifts || []}
        />
      </Suspense>
    </>
  );
}
