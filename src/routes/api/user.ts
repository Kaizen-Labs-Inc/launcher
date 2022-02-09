import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { prisma } from '$lib/prismaClient';
import type { Organization } from '@prisma/client';
import validateUser from '$lib/validateUser';
import { RoleType } from '../../model/RoleType';
import { BAD_REQUEST, UNAUTHORIZED } from '$lib/responseConstants';

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
