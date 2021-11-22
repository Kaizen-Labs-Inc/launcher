import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import getAuth from '$lib/getAuth';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {
	const decode = getAuth(request)
	const users = await prisma.user.findMany()
	return { body: users }
}
