import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import getAuth from '$lib/getAuth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function put(request: ServerRequest): Promise<void | EndpointOutput> {

	if (!request.body) {
		return {
			status: 400
		};
	}
	let positions = [];
	let boardId;
	try {
		const parsed = JSON.parse(request.body.toString());
		if (Array.isArray(parsed)) {
			positions = parsed;
			boardId = positions[0].boardId;
			positions.forEach(p => {
				if (p.boardId !== boardId) {
					return {
						status: 400
					};
				}
			});
		} else {
			positions = [parsed];
			boardId = parsed.boardId;
		}
	} catch (e: unknown) {
		console.error(e);
		return {
			status: 400
		};
	}

	const auth = getAuth(request);
	const googleId = auth?.user?.connections?.google?.sub;
	if (!googleId) {
		return {
			status: 404
		};
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
		return {
			status: 404
		};
	}

	const newPositions = positions.filter(p => {
		return !board.positions.find(it => it.channelId === p.channel.id);
	}).concat(positions.filter(p => !p.channel.id))
	const updatedPositions = positions.filter(p => {
		return !!board.positions.find(it => it.channelId === p.channel.id && it.position !== p.position);
	});
	const removedPositions = positions.filter(p => {
		return !board.positions.find(it => it.channelId === p.channel.id);
	});

	let created = []
	// create new positions
	if (newPositions.length > 0) {
		console.log('Creating new positions: ' + newPositions.map(it => `${it.id}/${it.position}`));
		created = await Promise.all(newPositions.map(p => {
			const dateCreated = new Date().toISOString();
			const d = Object.assign({}, p, {
				dateCreated: dateCreated,
				lastModified: dateCreated,
				board: {
					connect: { id: board.id }
				},
				channel: {
					connect: { id: p.channel.id }
				}
			});
			return prisma.position.create({
				data: d
			});
		})).catch(e => {
			console.error(e);
		});
	}

	function later(delay) {
		return new Promise(function(resolve) {
			setTimeout(resolve, delay);
		});
	}
	let updated = []
	// update existing positions
	if (updatedPositions.length > 0) {
		console.log(updatedPositions.map(it => `${it.id}/${it.position}`));
		updated = await Promise.all(updatedPositions.map(async (p, i) => {
				await later(i * 100)
				return prisma.position.update({
					data: {
						position: p.position,
						lastModified: new Date().toISOString()
					},
					where: {
						id: p.id
					}
				})
			})
		).catch(e => {
			console.error(e);
		});
	}

	// delete extraaneous positions
	const idsToRemove = removedPositions.map(it => it.id);
	if (idsToRemove.length > 0) {
		console.log('Deleting positions: ' + idsToRemove);
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
	return { body: (created).concat((updated)) };
}
