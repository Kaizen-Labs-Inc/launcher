import camelcaseKeys from 'camelcase-keys';
import { prisma } from '$lib/prismaClient';
import type { User } from '@prisma/client';
import type GoogleUser from '../model/api/GoogleUser';

export default async function (user: GoogleUser): Promise<User> {

	const dateCreated = new Date().toISOString()
	const googleProfile = camelcaseKeys(Object.assign({}, user, {
		dateCreated: dateCreated,
		lastModified: dateCreated,
		provider: 'google'
	}))
	delete googleProfile.hd

	let created;
	try {
		created = await prisma.user.create({
			data: {
				dateCreated: dateCreated,
				lastModified: dateCreated,
				googleProfile: {
					create: googleProfile
				}
			},
			include: {
				googleProfile: true
			}
		})
	} catch (e) {
		// could be duplicate signup
		console.error(e)
		console.warn("Error signing up user, attempting to find an existing user by email")
		created = await prisma.user.findFirst({
			where: {
				googleProfile: {
					email: googleProfile.email
				}
			}
		})
	}
	return created
}
