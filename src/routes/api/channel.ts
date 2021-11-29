import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { PrismaClient } from '@prisma/client'
import getAuth from '$lib/getAuth';
import getPathParam from '$lib/getPathParam';

const prisma = new PrismaClient()

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {

	const auth = getAuth(request)

	return { body: "hello, " +  getPathParam(request.path, -2)}
}


