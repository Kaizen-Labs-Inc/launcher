import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { prisma } from '$lib/prismaClient';
import { BoardType } from '../../../model/api/BoardType';
import validateUser  from '$lib/validateUser';

const BOARD_SELECTIONS = {
	id: true,
	boardType: true,
	positions: {
		select: {
			id: true,
			channel: {
				select: {
					id: true,
					name: true,
					description: true,
					emoji: true,
					image: true,
					url: true,
					tags: true
				}
			},
			position: true
		}
	}
}

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {

	const user = await validateUser(request, prisma)

	let board;

	if (user) {
		board = await prisma.board.findFirst({
			where: {
				boardType: 2,
				user: {
					id: user.id
				}
			},
			select: BOARD_SELECTIONS
		})
	}
	if (!board) {
		board = await prisma.board.findFirst({
			where: {
				boardType: 0
			},
			select: BOARD_SELECTIONS
		})
	}
	if (!board) {
		return {
			status: 404
		}
	}
	return { body: board }
}


export async function post(request: ServerRequest): Promise<void | EndpointOutput> {

	const user = await validateUser(request, prisma)

	if (!user) {
		return {
			status: 401
		}
	}

	if (!request.body) {
		return {
			status: 400
		}
	}
	let board
	try {
		board = JSON.parse(request.body.toString())
	} catch (e: unknown) {
		console.error(e)
		return {
			status: 400
		}
	}

	const dateCreated = new Date().toISOString()
	let created;
	try {
		created = await prisma.board.create({
			data: {
				dateCreated: dateCreated,
				lastModified: dateCreated,
				boardType: BoardType.USER.valueOf(),
				user: {
					connect: {
						id : user.id
					}
				},
				positions: {
					create: board.positions.map(p => {
						return {
							channelId: p.channel.id,
							position: p.position,
							dateCreated: dateCreated,
							lastModified: dateCreated,
						}
					})
				}
			}
		})
	} catch (e: unknown) {
		console.error(e)
	}

	if (!created) {
		return {
			status: 500
		}
	} else {
		return {
			status: 201,
			body: await prisma.board.findFirst({
				where: {
					id: created.id
				},
				select: BOARD_SELECTIONS
			})
		}
	}
}
