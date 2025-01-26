import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const desiredOrder = [
      "Early Morning",
      "Morning",
      "Standard Day",
      "Afternoon",
      "Night",
    ];
    const shiftPatterns = await prisma.shiftPattern.findMany();

    return NextResponse.json(
      shiftPatterns.sort((a, b) => {
        return (
          desiredOrder.indexOf(a.shift_name) -
          desiredOrder.indexOf(b.shift_name)
        );
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "failed to load data." },
      { status: 500 },
    );
  }
}
