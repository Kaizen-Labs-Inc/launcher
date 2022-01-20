import { prisma } from '$lib/prismaClient';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import getAuth from '$lib/getAuth';
import { NOT_FOUND } from '$lib/responseConstants';
import camelcaseKeys from 'camelcase-keys';

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {
	const auth = getAuth(request)

	const dest = request.params.dest
	console.log("Signing up with destination " + dest)

	if (!auth) {
		return NOT_FOUND
	}

	const dateCreated = new Date().toISOString()
	const googleProfile = camelcaseKeys(Object.assign({}, auth.user, {
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

	console.log(created)

	return {
		headers: { Location: dest || '/' },
		status: 302
	}
}
