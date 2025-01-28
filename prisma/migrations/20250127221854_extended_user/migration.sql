/*
  Warnings:

  - The primary key for the `Shift` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ShiftAssignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ShiftLimit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ShiftPattern` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ShiftRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - The primary key for the `UserPreference` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `workEmail` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workPhone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobRole" AS ENUM ('TEAM_LEADER', 'TECHNICAL_SUPPORT', 'SERVICE_DESK_ASSOCIATE', 'IITC');

-- DropForeignKey
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_pattern_id_fkey";

-- DropForeignKey
ALTER TABLE "ShiftAssignment" DROP CONSTRAINT "ShiftAssignment_shift_id_fkey";

-- DropForeignKey
ALTER TABLE "ShiftAssignment" DROP CONSTRAINT "ShiftAssignment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ShiftLimit" DROP CONSTRAINT "ShiftLimit_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ShiftRequest" DROP CONSTRAINT "ShiftRequest_pattern_id_fkey";

-- DropForeignKey
ALTER TABLE "ShiftRequest" DROP CONSTRAINT "ShiftRequest_shift_id_fkey";

-- DropForeignKey
ALTER TABLE "ShiftRequest" DROP CONSTRAINT "ShiftRequest_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_pattern_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_user_id_fkey";

-- AlterTable
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_pkey",
ALTER COLUMN "shift_id" DROP DEFAULT,
ALTER COLUMN "shift_id" SET DATA TYPE TEXT,
ALTER COLUMN "pattern_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Shift_pkey" PRIMARY KEY ("shift_id");
DROP SEQUENCE "Shift_shift_id_seq";

-- AlterTable
ALTER TABLE "ShiftAssignment" DROP CONSTRAINT "ShiftAssignment_pkey",
ALTER COLUMN "assignment_id" DROP DEFAULT,
ALTER COLUMN "assignment_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "shift_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShiftAssignment_pkey" PRIMARY KEY ("assignment_id");
DROP SEQUENCE "ShiftAssignment_assignment_id_seq";

-- AlterTable
ALTER TABLE "ShiftLimit" DROP CONSTRAINT "ShiftLimit_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShiftLimit_pkey" PRIMARY KEY ("user_id");

-- AlterTable
ALTER TABLE "ShiftPattern" DROP CONSTRAINT "ShiftPattern_pkey",
ALTER COLUMN "pattern_id" DROP DEFAULT,
ALTER COLUMN "pattern_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShiftPattern_pkey" PRIMARY KEY ("pattern_id");
DROP SEQUENCE "ShiftPattern_pattern_id_seq";

-- AlterTable
ALTER TABLE "ShiftRequest" DROP CONSTRAINT "ShiftRequest_pkey",
ALTER COLUMN "request_id" DROP DEFAULT,
ALTER COLUMN "request_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "shift_id" SET DATA TYPE TEXT,
ALTER COLUMN "pattern_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShiftRequest_pkey" PRIMARY KEY ("request_id");
DROP SEQUENCE "ShiftRequest_request_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
ADD COLUMN     "about" TEXT,
ADD COLUMN     "addressLine1" TEXT,
ADD COLUMN     "addressLine2" TEXT,
ADD COLUMN     "certifications" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "jobRole" "JobRole",
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "personalEmail" TEXT,
ADD COLUMN     "personalPhone" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "receiveScheduleByEmail" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "workEmail" TEXT NOT NULL,
ADD COLUMN     "workPhone" TEXT NOT NULL,
ALTER COLUMN "user_id" DROP DEFAULT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");
DROP SEQUENCE "User_user_id_seq";

-- AlterTable
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_pkey",
ALTER COLUMN "preference_id" DROP DEFAULT,
ALTER COLUMN "preference_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "pattern_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("preference_id");
DROP SEQUENCE "UserPreference_preference_id_seq";

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
