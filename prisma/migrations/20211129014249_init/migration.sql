-- CreateTable
CREATE TABLE "Organization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "googleProfileId" INTEGER NOT NULL,
    "organizationId" INTEGER,
    CONSTRAINT "User_googleProfileId_fkey" FOREIGN KEY ("googleProfileId") REFERENCES "GoogleProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GoogleProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sub" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "given_name" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL,
    "locale" TEXT NOT NULL,
    "hd" TEXT NOT NULL,
    "provider" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Board" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "boardType" INTEGER NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Board_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BoardChannel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "position" INTEGER NOT NULL,
    "boardId" INTEGER NOT NULL,
    "channelId" INTEGER NOT NULL,
    CONSTRAINT "BoardChannel_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BoardChannel_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT,
    "channelType" INTEGER NOT NULL,
    "userId" INTEGER,
    "organizationId" INTEGER,
    CONSTRAINT "Channel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Channel_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "inviteeEmail" TEXT NOT NULL,
    "inviteeName" TEXT,
    "organizationId" INTEGER NOT NULL,
    CONSTRAINT "Invitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_googleProfileId_key" ON "User"("googleProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "GoogleProfile_email_key" ON "GoogleProfile"("email");
