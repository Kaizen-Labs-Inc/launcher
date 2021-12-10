import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import getAuth from '$lib/getAuth';
import { prisma } from '$lib/prismaClient';
import isEmail from '$lib/isEmail';

const BAD_REQUEST = { status: 400 }
const NOT_FOUND = { status: 404 }
const slugChars = 'bcdefghjklmnopqrstvwxyz1234567890';
const sourceArray = [1,2,3,4,5,6,7,8,9,10,11,12];

export async function post(request: ServerRequest): Promise<void | EndpointOutput> {

	if (!request.body) {
		return BAD_REQUEST
	}

	let invitations = [];
	let organizationId: number;

	try {
		const parsed = JSON.parse(request.body.toString());
		if (!Array.isArray(parsed)) {
			return BAD_REQUEST
		}
		if (parsed.length === 0) {
			return BAD_REQUEST
		}
		invitations = parsed;
		organizationId = invitations.find(it => it.organizationId)?.organizationId
	} catch (e: unknown) {
		console.error(e);
		return BAD_REQUEST
	}

	if (organizationId && invitations.find(it => it.organizationId && it.organizationId !== organizationId)) {
		return BAD_REQUEST
	}

	const auth = getAuth(request);
	const googleId = auth?.user?.connections?.google?.sub;

	console.log(invitations)

	if (!googleId) {
		return NOT_FOUND;
	}

	const user = await prisma.user.findFirst({
		where: {
			googleProfile: {
				sub: googleId
			}
		}
	});

	if (organizationId) {
		// check user access
		const role = await prisma.role.findFirst({
			where: {
				organizationId: organizationId,
				user: {
					googleProfile: {
						sub: googleId
					}
				}
			}
		});

		if (!role) {
			return NOT_FOUND;
		}
	}

	if (invitations.find(it => !isEmail(it.inviteeEmail))) {
		// todo validate if organization is domain restricted
		return BAD_REQUEST
	}

	const created = [];

	await prisma.$transaction(async (prisma) => {
		if (invitations.length > 0) {
			for (const i of invitations) {
				try {
					const dateCreated = new Date().toISOString();
					const slug = sourceArray.map(_ => { return slugChars[Math.floor(Math.random() * slugChars.length)]}).join("")
					console.log(slug)
					created.push(await prisma.invitation.create({
						data: {
							inviteeEmail: i.inviteeEmail,
							slug: slug,
							dateCreated: dateCreated,
							lastModified: dateCreated,
							organization: {
								connect: {
									id: i.organizationId
								}
							},
							user: {
								connect: {
									id: user.id
								}
							}
						}
					}))
				} catch (e: unknown) {
					console.error(e)
				}
			}
		}
	})

	if (created.length) {
		// todo: send postmark invitations
		return {
			status: 201,
			body: created
		};
	} else {
		return {
			status: 500
		}
	}
}
