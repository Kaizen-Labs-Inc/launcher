import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { prisma } from '$lib/prismaClient';
import validateUser from '$lib/validateUser';

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {
	const user = await validateUser(request, prisma);

	if (!user) {
		return {
			status: 401
		};
	}

	return {
		body: user
	};
}
