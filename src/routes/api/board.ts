import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { PrismaClient } from '@prisma/client'
import getAuth from '$lib/getAuth';
import { BoardType } from '../../model/api/BoardType';
import validateUser  from '$lib/validateUser';

const prisma = new PrismaClient()

const SELECTIONS = {
	id: true,
	boardType: true,
	positions: {
		select: {
			id: true,
			channel: true,
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
			select: SELECTIONS
		})
	}
	if (!board) {
		board = await prisma.board.findFirst({
			where: {
				boardType: 0
			},
			select: SELECTIONS
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

	const positions = board.positions
	delete board.id
	delete board.positions
	const dateCreated = new Date().toISOString()
	board.dateCreated = dateCreated
	board.lastModified = dateCreated
	board.boardType = BoardType.USER.valueOf()
	board.userId = user.id
	let created;
	try {
		created = await prisma.board.create({
			data: board
		})
	} catch (e: unknown) {
		console.error(e)
	}

	if (!created) {
		return {
			status: 500
		}
	}

	created.positions = []
	for (const p of positions) {
		try {
			const newPosition = await prisma.position.create({
				data: {
					channelId: p.channel.id,
					boardId: created.id,
					position: p.position,
					dateCreated: dateCreated,
					lastModified: dateCreated
				}
			})
			created.positions.push(newPosition)
		} catch (e: unknown) {
			console.error(e)
		}
	}
	return {
		status: 201,
		body: created
	}

}
