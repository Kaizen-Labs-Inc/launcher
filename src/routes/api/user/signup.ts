import { prisma } from '$lib/prismaClient';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import getAuth from '$lib/getAuth';
import { NOT_FOUND } from '$lib/responseConstants';
import camelcaseKeys from 'camelcase-keys';

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {
	const auth = getAuth(request)

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

	const created = await prisma.user.create({
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
	console.log(created)

	return {
		headers: { Location: '/' },
		status: 302
	}
}
