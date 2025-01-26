const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      username: "randy_marsh",
      email: "randy.marsh@example.com",
      password_hash: "hashed_password_123",
      user_role: "user",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "jaden_smith",
      email: "jaden.smith@example.com",
      password_hash: "hashed_password_456",
      user_role: "admin",
    },
  });
  const user3 = await prisma.user.create({
    data: {
      username: "eric_cartman",
      email: "eric.cartman@example.com",
      password_hash: "hashed_password_456",
      user_role: "developer",
    },
  });
  const user4 = await prisma.user.create({
    data: {
      username: "hansel",
      email: "hansel@example.com",
      password_hash: "hashed_password_456",
      user_role: "admin",
    },
  });
  const user5 = await prisma.user.create({
    data: {
      username: "derek_zoolander",
      email: "derek.zoolander@example.com",
      password_hash: "hashed_password_456",
      user_role: "admin",
    },
  });

  // Create Shift Patterns
  //   const pattern1 = await prisma.shiftPattern.create({
  //     data: {
  //       shift_name: 'Morning Shift',
  //       start_time: '06:00',
  //       end_time: '14:00',
  //     },
  //   });

  //   const pattern2 = await prisma.shiftPattern.create({
  //     data: {
  //       shift_name: 'Night Shift',
  //       start_time: '22:00',
  //       end_time: '06:00',
  //     },
  //   });

  //EM:cm6cbzrb40000vz44f08v5gbv
  //MO:cm6cc032f0001vz4465trmkth
  //SD:cm6cc12740002vz447v87zy1v
  //AF:cm6cc12740003vz44f4qywm5m
  //NI:cm6cc12740004vz44j5e12zdh

  // Create Shifts
  const shift1 = await prisma.shift.create({
    data: {
      shift_date: new Date("2025-01-25T06:00:00Z"),
      pattern_id: "cm6cbzrb40000vz44f08v5gbv",
    },
  });

  const shift2 = await prisma.shift.create({
    data: {
      shift_date: new Date("2025-01-25T22:00:00Z"),
      pattern_id: "cm6cc12740002vz447v87zy1v",
    },
  });
  const shift3 = await prisma.shift.create({
    data: {
      shift_date: new Date("2025-01-25T22:00:00Z"),
      pattern_id: "cm6cc12740002vz447v87zy1v",
    },
  });
  const shift4 = await prisma.shift.create({
    data: {
      shift_date: new Date("2025-01-25T22:00:00Z"),
      pattern_id: "cm6cc12740003vz44f4qywm5m",
    },
  });
  const shift5 = await prisma.shift.create({
    data: {
      shift_date: new Date("2025-01-25T22:00:00Z"),
      pattern_id: "cm6cc12740004vz44j5e12zdh",
    },
  });

  // Create Shift Requests
  await prisma.shiftRequest.create({
    data: {
      user_id: user1.user_id,
      shift_id: shift1.shift_id,
      pattern_id: "cm6cbzrb40000vz44f08v5gbv",
      status: "pending",
    },
  });

  await prisma.shiftRequest.create({
    data: {
      user_id: user2.user_id,
      shift_id: shift2.shift_id,
      pattern_id: "cm6cc12740002vz447v87zy1v",
      status: "approved",
    },
  });

  // Create User Preferences
  await prisma.userPreference.create({
    data: {
      user_id: user1.user_id,
      pattern_id: "cm6cbzrb40000vz44f08v5gbv",
    },
  });

  await prisma.userPreference.create({
    data: {
      user_id: user2.user_id,
      pattern_id: "cm6cc12740002vz447v87zy1v",
    },
  });

  // Create Shift Assignments
  await prisma.shiftAssignment.create({
    data: {
      user_id: user1.user_id,
      shift_id: shift1.shift_id,
      shift_role: "SL",
    },
  });

  await prisma.shiftAssignment.create({
    data: {
      user_id: user2.user_id,
      shift_id: shift2.shift_id,
      shift_role: "NR",
    },
  });
  await prisma.shiftAssignment.create({
    data: {
      user_id: user3.user_id,
      shift_id: shift3.shift_id,
      shift_role: "NR",
    },
  });
  await prisma.shiftAssignment.create({
    data: {
      user_id: user4.user_id,
      shift_id: shift4.shift_id,
      shift_role: "NR",
    },
  });
  await prisma.shiftAssignment.create({
    data: {
      user_id: user5.user_id,
      shift_id: shift5.shift_id,
      shift_role: "ASL",
    },
  });

  // Create Shift Limits
  await prisma.shiftLimit.create({
    data: {
      user_id: user1.user_id,
      month_year: new Date("2025-01-01T00:00:00Z"),
      request_count: 3,
      request_limit: 5,
    },
  });

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
