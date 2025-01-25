import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("run");
    const shiftPatterns = await prisma.shiftPattern.findMany();

    // Convert BigInt values to strings
    const serializedShiftPatterns = shiftPatterns.map((pattern) => {
      return {
        ...pattern,
        pattern_id: pattern.pattern_id.toString(), // Example: converting a `BigInt` field named `id` to a string
        // Convert any other BigInt fields similarly
      };
    });

    return NextResponse.json(
      { shiftPatterns: serializedShiftPatterns },
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
