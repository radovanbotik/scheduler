"use server";

import { TeamView } from "@/components/views/CalendarDataLayer/team-view/TeamView";
import { TeamViewSkeleton } from "@/components/views/CalendarDataLayer/team-view/TeamViewSketeleton";
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

export default async function page({
  searchParams,
}: {
  searchParams?: Promise<{ date?: string }>;
}) {
  const dateParam = (await searchParams)?.date;
  const currentDate = dateParam ? new Date(dateParam) : new Date();

  const [shiftPatterns, shifts] = await Promise.all([
    getShiftPatterns(),
    getShifts(currentDate),
  ]);

  return (
    <>
      <Suspense fallback={<TeamViewSkeleton currentDate={currentDate} />}>
        <TeamView
          currentDate={currentDate}
          shiftPatterns={shiftPatterns || []}
          shifts={shifts || []}
        />
      </Suspense>
    </>
  );
}
