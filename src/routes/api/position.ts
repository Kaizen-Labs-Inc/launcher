import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import getAuth from '$lib/getAuth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function patch(request: ServerRequest): Promise<void | EndpointOutput> {
	console.log('received patch');
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
		}
	});

	if (!board) {
		return {
			status: 404
		};
	}

	const newPositions = positions.filter(p => !p.id)
	console.log("Creating new positions: " + JSON.stringify(newPositions))
	const created = Promise.all(newPositions.map(p => {
		const dateCreated = new Date().toISOString()
		prisma.position.create({
			data: Object.assign(p, {
				dateCreated: dateCreated,
				lastModified: dateCreated
			})
		})
	})).catch(e => {
		console.error(e);
	})

	const updated = await Promise.all(positions.map(p => {
		prisma.position.update({
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
		})
	return { body: created.concat(updated) };
}
