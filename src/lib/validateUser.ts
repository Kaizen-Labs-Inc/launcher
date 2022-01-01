import getAuth from '$lib/getAuth';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { PrismaClient, User } from '@prisma/client'

export default function validateUser(request: ServerRequest, prisma: PrismaClient): Promise<User | null> {
	const auth = getAuth(request)
	const profile = auth?.user?.connections?.google
	if (!profile) {
		return Promise.resolve(null)
	}
	const googleId = auth?.user?.connections?.google?.sub
	return prisma.user.findFirst({
		where: {
			googleProfile: {
				sub: googleId
			}
		},
		include: {
			googleProfile: true
		}
	})
		.catch(e => {
		console.warn(e)
		return undefined
	})
}
