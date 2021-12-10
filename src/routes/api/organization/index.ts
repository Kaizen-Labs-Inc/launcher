import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { prisma } from '$lib/prismaClient';
import type { Organization } from '@prisma/client';
import validateUser from '$lib/validateUser';
import { RoleType } from '../../../model/RoleType';


export async function get(request: ServerRequest): Promise<void | EndpointOutput> {

	const user = await validateUser(request, prisma);

	if (!user) {
		return {
			status: 401
		};
	}

	const role = await prisma.role.findFirst({
		where: {
			userId: user.id
		},
		include: {
			organization: {
				include: {
					emailDomains: true
				}
			}
		}
	})

	if (role) {
		return {
			body: role.organization
		};
	} else {
		return {
			status: 404
		};
	}
}

export async function post(request: ServerRequest): Promise<void | EndpointOutput> {

	const user = await validateUser(request, prisma);

	if (!user) {
		return {
			status: 401
		};
	}

	if (!request.body) {
		return {
			status: 400
		};
	}
	let organization: Organization;

	try {
		const dateCreated = new Date().toISOString();
		const body = JSON.parse(request.body.toString());
		const emailDomains = body.emailDomains;
		const domainRestricted = body.domainRestricted && !!emailDomains?.length;
		organization = await prisma.organization.create({
			data: Object.assign(body, {
				dateCreated: dateCreated,
				lastModified: dateCreated,
				domainRestricted: domainRestricted,
				emailDomains: {
					create: emailDomains.map(it => Object.assign(it, { dateCreated: dateCreated, lastModified: dateCreated }))
				},
				members: {
					create: [{
						user: { connect: { id: user.id } },
						roleType: RoleType.OWNER.valueOf(),
						dateCreated: dateCreated,
						lastModified: dateCreated
					}]
				},
				subscription: {
					connect: {
						id: 1
					}
				},
			}),
			include: {
				emailDomains: true
			}
		});
	} catch (e: unknown) {
		console.error(e);
		return {
			status: 400
		};
	}

	if (organization) {
		return {
			status: 201,
			body: organization
		};
	} else {
		return {
			status: 500
		};
	}
}

