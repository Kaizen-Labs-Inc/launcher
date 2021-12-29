import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { prisma } from '$lib/prismaClient';
import { NOT_FOUND } from '$lib/responseConstants';

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {

	const parts = request.path.split('/')
	console.log(parts)

	let slug: string;

	try {
		slug = parts[parts.length - 1]
		if (!slug) {
			return NOT_FOUND
		}
	} catch (e) {
		return NOT_FOUND
	}

	const found = await prisma.invitation.findFirst({
		where: {
			slug: slug
		}
	})

	if (!found) {
		return NOT_FOUND
	}

	return {
		status: 201,
		body: found
	};
}
