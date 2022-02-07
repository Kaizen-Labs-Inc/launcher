import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { prisma } from '$lib/prismaClient';
import type { Organization } from '@prisma/client';
import validateUser from '$lib/validateUser';
import { RoleType } from '../../model/RoleType';
import { BAD_REQUEST, UNAUTHORIZED } from '$lib/responseConstants';

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
		select: {
			organization: true
		}
	});

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
		return UNAUTHORIZED
	}

	if (!request.body) {
		return BAD_REQUEST
	}
	let organization: Organization;

	try {
		const dateCreated = new Date().toISOString();
		const body = JSON.parse(request.body.toString());
		organization = await prisma.organization.create({
			data: Object.assign(body, {
				dateCreated: dateCreated,
				lastModified: dateCreated,
				members: {
					create: [
						{
							user: { connect: { id: user.id } },
							roleType: RoleType.OWNER.valueOf(),
							dateCreated: dateCreated,
							lastModified: dateCreated
						}
					]
				}
			})
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
