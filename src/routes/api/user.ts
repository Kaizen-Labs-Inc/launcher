import type { RequestEvent } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { prisma } from '$lib/prismaClient';
import validateUser from '$lib/validateUser';

export async function get(event: RequestEvent): Promise<void | EndpointOutput> {
	const user = await validateUser(event.request, prisma);

	if (!user) {
		return {
			status: 401
		};
	}

	return {
		body: user
	};
}
