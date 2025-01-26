import { prisma } from "@/prisma/prisma";
import { formatISO, lastDayOfMonth, parseISO, startOfMonth } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { User, ShiftRole, ShiftPattern } from "@prisma/client";

export type ShiftWithDetails = {
  shift_date: Date; // Date of the shift
  shift_id: string; // Unique identifier for the shift
  pattern_id: string; // Pattern ID related to the shift
  pattern: {
    pattern_id: string; // Pattern ID
    shift_name: string; // Name of the shift pattern
    start_time: string; // Start time of the shift
    end_time: string; // End time of the shift
  };
  ShiftAssignments: {
    assignment_id: string; // Unique ID for the assignment
    user_id: string; // User ID for the assigned user
    shift_role: ShiftRole; // Role assigned to the user in the shift
    user: User; // User details
  }[];
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date");
  if (!date) throw new Error("invalid date");
  const firstDayInMonth = startOfMonth(date);
  const lastDayInMonth = lastDayOfMonth(date);

  try {
    const shifts: ShiftWithDetails[] = await prisma.shift.findMany({
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
    return NextResponse.json(shifts, { status: 200 });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "failed to load data." },
      { status: 500 },
    );
  }
}
