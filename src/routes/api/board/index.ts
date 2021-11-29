import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { PrismaClient } from '@prisma/client'
import getAuth from '$lib/getAuth';

const prisma = new PrismaClient()

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {

	const auth = getAuth(request)
	const googleId = auth?.user?.connections?.google?.sub
	if (!googleId) {
		return {
			status: 404
		}
	}

	let board = await prisma.board.findFirst({
		where: {
			boardType: 2,
			user: {
				googleProfile: {
					sub: googleId
				}
			}
		},
		select: {
			boardChannels: {
				select: {
					id: true,
					channel: true,
					position: true
				}
			}
		}
	})
	if (!board) {
		board = await prisma.board.findFirst({
			where: {
				boardType: 0
			},
			select: {
				boardChannels: {
					select: {
						id: true,
						channel: true,
						position: true
					}
				}
			}
		})
	}
	console.log(JSON.stringify(board))
	if (!board) {
		return {
			status: 404
		}
	}
	return { body: board }
}

