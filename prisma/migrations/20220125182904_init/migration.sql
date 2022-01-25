-- AlterTable
ALTER TABLE "board" ADD COLUMN     "backdrop_id" INTEGER;

-- CreateTable
CREATE TABLE "Backdrop" (
    "id" SERIAL NOT NULL,
    "animated" BOOLEAN NOT NULL,
    "dark_mode" BOOLEAN NOT NULL,
    "colors" TEXT[],
    "date_created" TIMESTAMP(3) NOT NULL,
    "last_modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Backdrop_pkey" PRIMARY KEY ("id")
);
