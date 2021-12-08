import Prisma from '@prisma/client';

export let prisma;

if (Prisma === undefined) {
	import("@prisma/client").then(({ PrismaClient }) => {
		prisma = new PrismaClient();
	});
} else {
	prisma = new Prisma.PrismaClient();
}
