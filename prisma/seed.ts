// @ts-nocheck

import { ShiftRole, JobRole, UserRole, PrismaClient } from "@prisma/client";

// const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // 1. Seed Users
  const userData = generateUserData(15); // creates array of 15 user objects
  // Use createMany so we don't get unique constraint errors on repeated seeds
  await prisma.user.createMany({
    data: userData,
    skipDuplicates: true,
  });

  // Grab the users from the DB (they may already have existed)
  const allUsers = await prisma.user.findMany();

  // 2. Seed Shift Patterns (5 fixed patterns)
  const shiftPatternData = [
    { shift_name: "Early Morning", start_time: "06:00", end_time: "15:00" },
    { shift_name: "Morning", start_time: "07:00", end_time: "16:00" },
    { shift_name: "Standard Day", start_time: "09:00", end_time: "18:00" },
    { shift_name: "Afternoon", start_time: "13:00", end_time: "22:00" },
    { shift_name: "Night", start_time: "21:30", end_time: "06:30" },
  ];

  await prisma.shiftPattern.createMany({
    data: shiftPatternData,
    skipDuplicates: true,
  });

  // Fetch the patterns from DB
  const shiftPatterns = await prisma.shiftPattern.findMany();

  // 3. For each day in January, create a Shift for each pattern
  const januaryDays = Array.from({ length: 31 }, (_, i) => i + 1);

  for (const day of januaryDays) {
    const shiftDate = new Date(2025, 0, day);
    for (const pattern of shiftPatterns) {
      // Create a shift
      const shift = await prisma.shift.create({
        data: {
          shift_date: shiftDate,
          pattern_id: pattern.pattern_id,
        },
      });

      // 4. Assign 2 random users to each Shift with random shift roles
      const assignedUsers = pickRandomItems(allUsers, 2);
      for (const user of assignedUsers) {
        // pick a random ShiftRole
        const randomShiftRole = randomShiftRoleEnumValue();
        await prisma.shiftAssignment.create({
          data: {
            user_id: user.user_id,
            shift_id: shift.shift_id,
            shift_role: randomShiftRole,
          },
        });
      }
    }
  }

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

function generateUserData(count: number) {
  const result = [];
  for (let i = 1; i <= count; i++) {
    // Replace these with realistic or random values if desired
    result.push({
      username: `user${i}`,
      workEmail: `user${i}@example.com`,
      // Use a simple hash or random string for demonstration
      password_hash: "somehashedpassword",
      user_role: UserRole.user,
      firstName: `FirstName${i}`,
      lastName: `LastName${i}`,
      workPhone: "555-555-0000",
      receiveScheduleByEmail: Math.random() > 0.5 ? true : false,
      // Optionally fill in more fields:
      personalEmail: `personal${i}@example.com`,
      personalPhone: `555-555-100${i}`,
      about: "Lorem ipsum dolor sit amet.",
      addressLine1: "123 Main St",
      city: "Example City",
      state: "EX",
      postalCode: `1234${i}`,
      country: "Example Country",
      jobRole: pickRandomJobRole(),
      certifications: "Basic, Advanced", // Or random
    });
  }
  return result;
}

/**
 * Pick n random distinct items from an array.
 */
function pickRandomItems<T>(arr: T[], n: number): T[] {
  if (n >= arr.length) return arr;
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
}

/**
 * Pick a random ShiftRole.
 */
function randomShiftRoleEnumValue(): ShiftRole {
  const roles = [
    ShiftRole.QM,
    ShiftRole.SL,
    ShiftRole.ASL,
    ShiftRole.TR,
    ShiftRole.SH,
    ShiftRole.CI,
    ShiftRole.NR,
  ];
  const randIndex = Math.floor(Math.random() * roles.length);
  return roles[randIndex];
}

/**
 * Pick a random JobRole from the enum.
 */
function pickRandomJobRole(): JobRole {
  const roles = [
    JobRole.TEAM_LEADER,
    JobRole.TECHNICAL_SUPPORT,
    JobRole.SERVICE_DESK_ASSOCIATE,
    JobRole.IITC,
  ];
  const randIndex = Math.floor(Math.random() * roles.length);
  return roles[randIndex];
}
