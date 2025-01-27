"use server";
// app/(whatever)/CalendarPage.tsx (or page.tsx if this is your route)
// import { getShiftPatterns, getShifts } from "@/lib/data-fetch"; // Your data fetching utils
import { lastDayOfMonth, startOfMonth } from "date-fns";
import { prisma } from "@/prisma/prisma";
import { MonthView } from "./month-view/MonthView";

async function getShifts(date: Date) {
  if (!date) throw new Error("invalid date");

  const firstDayInMonth = startOfMonth(date);
  const lastDayInMonth = lastDayOfMonth(date);
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

export async function CalendarDataLayer({
  currentDate,
}: {
  currentDate: Date;
}) {
  // 1) Figure out which date we should use. Maybe from query string, or default to now.

  // 2) Fetch data on the server side. This can be done in parallel.
  const [shiftPatterns, shifts] = await Promise.all([
    getShiftPatterns(),
    getShifts(currentDate),
  ]);

  // 3) Render a client component and pass the fetched data
  return (
    <MonthView
      currentDate={currentDate}
      shiftPatterns={shiftPatterns || []}
      shifts={shifts || []}
    />
  );
}
