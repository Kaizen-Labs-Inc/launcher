import type { User, PrismaClient } from '@prisma/client'

export default function addUser(profile: any, prisma: PrismaClient): Promise<User> {
	console.log("Adding user " + profile.email)
	const dateCreated = new Date().toISOString()

	return prisma.user.create({
		data: {
			dateCreated: dateCreated,
			lastModified: dateCreated,
			googleProfile: {
				create: Object.assign({}, profile, { dateCreated: dateCreated, lastModified: dateCreated, provider: 'google' })
			}
		},
		include: {
			googleProfile: true
		}
	})
}
