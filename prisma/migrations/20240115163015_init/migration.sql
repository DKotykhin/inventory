-- CreateEnum
CREATE TYPE "RoleTypes" AS ENUM ('USER', 'ADMIN', 'SUBADMIN', 'VISITOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "user_name" TEXT,
    "password_hash" TEXT,
    "avatar" TEXT,
    "role" "RoleTypes" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResetPassword" (
    "id" TEXT NOT NULL,
    "token" TEXT,
    "expired_at" TIMESTAMP(3),
    "changed_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "ResetPassword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailConfirm" (
    "id" TEXT NOT NULL,
    "token" TEXT,
    "expired_at" TIMESTAMP(3),
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "EmailConfirm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPassword_token_key" ON "ResetPassword"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPassword_user_id_key" ON "ResetPassword"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "EmailConfirm_token_key" ON "EmailConfirm"("token");

-- CreateIndex
CREATE UNIQUE INDEX "EmailConfirm_user_id_key" ON "EmailConfirm"("user_id");

-- AddForeignKey
ALTER TABLE "ResetPassword" ADD CONSTRAINT "ResetPassword_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailConfirm" ADD CONSTRAINT "EmailConfirm_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
