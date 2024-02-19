/*
  Warnings:

  - Added the required column `role` to the `RefreshTokens` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ( 'USER', 'ADMIN');

-- AlterTable
ALTER TABLE "RefreshTokens" ADD COLUMN     "role" "Role" NOT NULL;
