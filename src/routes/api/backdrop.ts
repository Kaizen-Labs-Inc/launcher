import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { prisma } from '$lib/prismaClient';

export async function get(): Promise<void | EndpointOutput> {
	return { body: await prisma.backdrop.findMany({
			include: {
				colors: true
			}
		}) };
}
