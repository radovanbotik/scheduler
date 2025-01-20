-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'user', 'developer');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "ShiftRole" AS ENUM ('QM', 'SL', 'ASL', 'TR', 'SH', 'CI', 'NR');

-- CreateTable
CREATE TABLE "User" (
    "user_id" BIGSERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "user_role" "UserRole" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "ShiftPattern" (
    "pattern_id" BIGSERIAL NOT NULL,
    "shift_name" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShiftPattern_pkey" PRIMARY KEY ("pattern_id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "shift_id" BIGSERIAL NOT NULL,
    "shift_date" TIMESTAMP(3) NOT NULL,
    "pattern_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("shift_id")
);

-- CreateTable
CREATE TABLE "ShiftRequest" (
    "request_id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "shift_id" BIGINT NOT NULL,
    "pattern_id" BIGINT NOT NULL,
    "status" "RequestStatus" NOT NULL,
    "request_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShiftRequest_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "preference_id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "pattern_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("preference_id")
);

-- CreateTable
CREATE TABLE "ShiftAssignment" (
    "assignment_id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "shift_id" BIGINT NOT NULL,
    "shift_role" "ShiftRole" NOT NULL,

    CONSTRAINT "ShiftAssignment_pkey" PRIMARY KEY ("assignment_id")
);

-- CreateTable
CREATE TABLE "ShiftLimit" (
    "user_id" BIGINT NOT NULL,
    "month_year" TIMESTAMP(3) NOT NULL,
    "request_count" INTEGER NOT NULL,
    "request_limit" INTEGER NOT NULL,

    CONSTRAINT "ShiftLimit_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_pattern_id_fkey" FOREIGN KEY ("pattern_id") REFERENCES "ShiftPattern"("pattern_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftRequest" ADD CONSTRAINT "ShiftRequest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftRequest" ADD CONSTRAINT "ShiftRequest_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "Shift"("shift_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftRequest" ADD CONSTRAINT "ShiftRequest_pattern_id_fkey" FOREIGN KEY ("pattern_id") REFERENCES "ShiftPattern"("pattern_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_pattern_id_fkey" FOREIGN KEY ("pattern_id") REFERENCES "ShiftPattern"("pattern_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftAssignment" ADD CONSTRAINT "ShiftAssignment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftAssignment" ADD CONSTRAINT "ShiftAssignment_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "Shift"("shift_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftLimit" ADD CONSTRAINT "ShiftLimit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
