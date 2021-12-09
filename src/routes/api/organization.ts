import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { prisma } from '$lib/prismaClient';
import { ChannelType } from '../../model/ChannelType';
import validateUser from '$lib/validateUser';
import stripPrefix from '$lib/stripPrefix';


export const CHANNEL_SELECTIONS = {
	tags: true
}

export async function post(request: ServerRequest): Promise<void | EndpointOutput> {

	const user = await validateUser(request, prisma)

	if (!user) {
		return {
			status: 401
		}
	}

	if (!request.body) {
		return {
			status: 400
		}
	}
	let organization: Organization;
	try {
		organization = JSON.parse(request.body.toString())
		console.log(organization)
	} catch (e: unknown) {
		console.error(e)
		return {
			status: 400
		}
	}

	return {
		status: 201,
		body: organization || {}
	}
}

