"use client";

import { useState, useEffect } from "react";
import { addMonths, subMonths } from "date-fns";
import { ShiftPattern } from "@prisma/client";
import { ShiftWithDetails } from "@/app/api/getShifts/route";
import MonthView from "../MonthView";

export function CalendarDataLayer() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [shiftPatterns, setShiftPatterns] = useState<ShiftPattern[]>([]);
  const [shifts, setShifts] = useState<ShiftWithDetails[]>([]);

  // Whenever currentDate changes, refetch
  useEffect(() => {
    (async function fetchData() {
      const [patterns, fetchedShifts] = await Promise.all([
        getShiftPatterns(),
        getShifts(currentDate),
      ]);
      if (patterns) setShiftPatterns(patterns);
      if (fetchedShifts) setShifts(fetchedShifts);
    })();
  }, [currentDate]);

  // Functions for changing the month
  function prevMonth() {
    setCurrentDate((prev) => subMonths(prev, 1));
  }

  function nextMonth() {
    setCurrentDate((prev) => addMonths(prev, 1));
  }

  return (
    <MonthView
      currentDate={currentDate}
      shiftPatterns={shiftPatterns}
      shifts={shifts}
      prevMonth={prevMonth}
      nextMonth={nextMonth}
    />
  );
}

// Example fetchers (same as before, but kept in the container or utilities)
async function getShiftPatterns(): Promise<ShiftPattern[] | undefined> {
  try {
    const response = await fetch("/api/shiftpatterns");
    if (!response.ok) {
      throw new Error("Failed to fetch shift patterns");
    }
    return (await response.json()) as ShiftPattern[];
  } catch (error) {
    console.error("Error fetching shift patterns:", error);
  }
}

async function getShifts(date: Date): Promise<ShiftWithDetails[] | undefined> {
  try {
    const response = await fetch(`/api/getShifts?date=${date.toISOString()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch shifts");
    }
    return (await response.json()) as ShiftWithDetails[];
  } catch (error) {
    console.error("Error fetching shifts:", error);
  }
}
