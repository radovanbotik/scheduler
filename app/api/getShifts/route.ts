import { prisma } from "@/prisma/prisma";
import { formatISO, lastDayOfMonth, parseISO, startOfMonth } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date");
  if (!date) throw new Error("invalid date");
  const firstDayInMonth = startOfMonth(date);
  const lastDayInMonth = lastDayOfMonth(date);

  console.log(firstDayInMonth, lastDayInMonth);

  try {
    const shifts = await prisma.shift.findMany({
      where: {
        shift_date: {
          gte: firstDayInMonth,
          lte: lastDayInMonth,
        },
      },
    });
    return NextResponse.json({ shifts: shifts }, { status: 200 });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "failed to load data." },
      { status: 500 },
    );
  }
}
