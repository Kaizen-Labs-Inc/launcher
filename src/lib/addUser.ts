import type { User, PrismaClient } from '@prisma/client'
import camelcaseKeys from 'camelcase-keys';

export default function addUser(profile: any, prisma: PrismaClient): Promise<User> {
	const dateCreated = new Date().toISOString()

	return prisma.user.create({
		data: {
			dateCreated: dateCreated,
			lastModified: dateCreated,
			googleProfile: {
				create: camelcaseKeys(Object.assign({}, profile, { dateCreated: dateCreated, lastModified: dateCreated, provider: 'google' }))
			}
		},
		include: {
			googleProfile: true
		}
	})
}
