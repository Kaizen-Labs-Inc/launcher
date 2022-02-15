import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import getAuth from '$lib/getAuth';
import { prisma } from '$lib/prismaClient';
import { BAD_REQUEST, NOT_FOUND } from '$lib/responseConstants';


export async function put(request: ServerRequest): Promise<void | EndpointOutput> {

	if (!request.body) {
		return BAD_REQUEST
	}


	let positions = [];
	let boardId: number;

	try {
		const parsed = JSON.parse(request.body.toString());
		if (!Array.isArray(parsed)) {
			return BAD_REQUEST
		}
		positions = parsed;
		boardId = Number.parseInt(request.params.id)
	} catch (e: unknown) {
		console.error(e);
		return BAD_REQUEST
	}

	const user = getAuth(request);
	const googleId = user?.sub;

	if (!googleId) {
		return NOT_FOUND;
	}

	if (!boardId) {
		return BAD_REQUEST
	}

	if (positions.find(p => p.boardId && p.boardId !== boardId)) {
		return BAD_REQUEST
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

	const newPositions = positions.filter(p => {
		return !board.positions.find(it => it.channelId === p.channel.id);
	}).concat(positions.filter(p => !p.channel.id))

	const updatedPositions = board.positions.map(p => {
		const found = positions.find(it => it.channel.id === p.channelId && it.position !== p.position);
		if (found) {
			return Object.assign(p, { position: found.position })
		} else {
			return undefined
		}
 	}).filter(it => it !== undefined);

	const removedPositions = board.positions.filter(p => {
		return !positions.find(it => it.channel.id === p.channelId);
	});
	let syncdPositions;

	await prisma.$transaction(async (prisma) => {
		// create new positions
		if (newPositions.length > 0) {
			for (const p of newPositions) {
				try {
					const dateCreated = new Date().toISOString();
					await prisma.position.create({
						data: {
							channelId: p.channel.id,
							boardId: board.id,
							position: p.position,
							dateCreated: dateCreated,
							lastModified: dateCreated
						}
					})
				} catch (e: unknown) {
					console.error(e)
				}
			}
		}

		// update existing positions
		if (updatedPositions.length > 0) {
			await Promise.all(updatedPositions.map(async (p, i) => {
				return await prisma.position.update({
					data: {
						position: p.position,
						lastModified: new Date().toISOString()
					},
					where: {
						id: p.id
					}
				})
			})).catch(e => {
				console.error(e);
			});
		}

		// delete extraaneous positions
		const idsToRemove = removedPositions.map(it => it.id);
		if (idsToRemove.length > 0) {
			await prisma.position.deleteMany({
				where: {
					id: {
						in: idsToRemove
					}
				}
			}).catch(e => {
				console.error(e);
			});
		}
		syncdPositions = await prisma.position.findMany({
			where: {
				boardId: boardId
			},
			orderBy: {
				position: "asc"
			},
			include: {
				channel: true
			}
		})
	})

	if (syncdPositions) {
		return { body: syncdPositions };
	} else {
		return {
			status: 500
		}
	}
}
