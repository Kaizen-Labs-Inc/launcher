import type { RequestEvent } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import getAuth from '$lib/getAuth';
import { prisma } from '$lib/prismaClient';
import { BAD_REQUEST, NOT_FOUND } from '$lib/responseConstants';


export async function put(event: RequestEvent): Promise<void | EndpointOutput> {
	if (!event.request.body) {
		return BAD_REQUEST;
	}

	const boardId: number = parseInt(event.request.params.id);
	let backdropId: number;
	try {
		const parsed = await event.request.json()
		backdropId = parsed.backdropId;
	} catch (e: unknown) {
		console.error(e);
		return BAD_REQUEST;
	}

	const user = getAuth(request);
	const googleId = user?.sub;

	if (!googleId) {
		return NOT_FOUND;
	}

	if (!boardId) {
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
		}
	});

	if (!board) {
		return NOT_FOUND;
	}

	const response = await prisma.board
		.update({
			data: {
				backdrop: {
					connect: {
						id: backdropId
					}
				},
				lastModified: new Date().toISOString()
			},
			where: {
				id: boardId
			}
		})
		.catch((e) => {
			console.error(e);
		});
	if (response) {
		return { body: response };
	} else {
		return {
			status: 500
		};
	}
}
