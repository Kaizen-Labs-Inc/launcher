import { prisma } from '$lib/prismaClient';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import getAuth from '$lib/getAuth';
import atobUnicode from '$lib/btoaUnicode';
import { NOT_FOUND } from '$lib/responseConstants';
import camelcaseKeys from 'camelcase-keys';
import { RoleType } from '../../../../model/RoleType';

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {
	const auth = getAuth(request)

	if (!auth) {
		return NOT_FOUND
	}

	const parts = request.path.split('/')

	let slug: string;
	let foundInvitation;

	try {
		slug = parts[parts.length - 2]
		if (!slug) {
			return NOT_FOUND
		}
		foundInvitation = await prisma.invitation.findUnique({
			where: {
				slug: slug
			},
			include: {
				organization: true
			}
		})

	} catch (e) {
		return NOT_FOUND
	}

	if (!foundInvitation) {
		return {
			headers: {
				"Location": `/auth-error?i=${atobUnicode(auth?.user?.email)}`,
				"Set-Cookie": "svelteauthjwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
			},
			status: 302
		}
	}

	console.log(foundInvitation)
	if (foundInvitation.organization) {
		// check organization email domain
	}
	const dateCreated = new Date().toISOString()
	const googleProfile = camelcaseKeys(Object.assign({}, auth.user, {
		dateCreated: dateCreated,
		lastModified: dateCreated,
		provider: 'google'
	}))
	delete googleProfile.hd
	console.log(googleProfile)
	const data: any = {
		dateCreated: dateCreated,
		lastModified: dateCreated,
		googleProfile: {
			create: googleProfile
		}
	}
	if (foundInvitation.organization) {
		data.role = {
			create: {
				dateCreated: dateCreated,
				lastModified: dateCreated,
				roleType: RoleType.USER.valueOf(),
				organization: {
					connect: {
						id: foundInvitation.organization.id
					}
				}
			}
		}
	}

	const created = await prisma.user.create({
		data: data,
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
