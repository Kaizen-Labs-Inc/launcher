import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { PrismaClient } from '@prisma/client'
import type { User } from '@prisma/client';
import getAuth from '$lib/getAuth';

const prisma = new PrismaClient()

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {
	const auth = getAuth(request)
	const users: User[] = await prisma.user.findMany({
		include: {
			googleProfile: true,
			organization: true
		},
	})
	return { body: users }
	// return { body: auth }
}
