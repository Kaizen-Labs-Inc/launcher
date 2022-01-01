import { prisma } from '$lib/prismaClient';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import getAuth from '$lib/getAuth';
import camelcaseKeys from 'camelcase-keys';
import { RoleType } from '../../../../model/RoleType';
import atobUnicode from '$lib/btoaUnicode';

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {
	const auth = getAuth(request)

	const errorPayload = {
		headers: {
			"Location": `/auth-error?s=true`,
			"Set-Cookie": "svelteauthjwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
		},
		status: 302
	}

	if (!auth) {
		return errorPayload
	}

	const parts = request.path.split('/')

	let slug: string;
	let foundInvitation;

	try {
		slug = parts[parts.length - 2]
		if (!slug) {
			return errorPayload
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
		return errorPayload
	}

	if (!foundInvitation) {
		return {
			headers: {
				"Location": `/auth-error?i=${atobUnicode(slug)}`,
				"Set-Cookie": "svelteauthjwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
			},
			status: 302
		}
	}

	if (foundInvitation.organization) {
		// TODO: check organization email domain
	}

	const dateCreated = new Date().toISOString()
	const googleProfile = camelcaseKeys(Object.assign({}, auth.user, {
		dateCreated: dateCreated,
		lastModified: dateCreated,
		provider: 'google'
	}))

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

	try {
		await prisma.user.create({
			data: data,
			include: {
				googleProfile: true
			}
		})
	} catch (e) {
		console.error(e)
		return errorPayload
	}

	return {
		headers: { Location: '/' },
		status: 302
	}
}
