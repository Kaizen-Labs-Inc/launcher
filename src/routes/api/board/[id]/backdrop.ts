import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import getAuth from '$lib/getAuth';
import { prisma } from '$lib/prismaClient';

const BAD_REQUEST = { status: 400 };
const NOT_FOUND = { status: 404 };

export async function put(request: ServerRequest): Promise<void | EndpointOutput> {
	if (!request.body) {
		return BAD_REQUEST;
	}

	let backdropId: number;
	let boardId: number;

	const auth = getAuth(request);
	const googleId = auth?.user?.connections?.google?.sub;

	if (!googleId) {
		return NOT_FOUND;
	}

	if (!boardId) {
		return BAD_REQUEST;
	}
	if (!backdropId) {
		return BAD_REQUEST;
	}

	// check user access
	const board = await prisma.board.findFirst({
		where: {
			boardType: 2,
			id: boardId,
			user: {
				googleProfile: {
					sub: googleId
				}
			}
		},
		include: {
			positions: true
		}
	});

	if (!board) {
		return NOT_FOUND;
	}

	// update existing positions

	return await prisma.position.update({
		data: {
			position: p.position,
			lastModified: new Date().toISOString()
		},
		where: {
			id: p.id
		}
	});

	if (syncdPositions) {
		return { body: syncdPositions };
	} else {
		return {
			status: 500
		};
	}
}
