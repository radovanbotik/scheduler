import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const shiftPatterns = await prisma.shiftPattern.findMany();

    return NextResponse.json(shiftPatterns, { status: 200 });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "failed to load data." },
      { status: 500 },
    );
  }
}
