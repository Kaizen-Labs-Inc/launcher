import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { PrismaClient } from '@prisma/client'
import { ChannelType } from '../../model/ChannelType';
import validateUser from '$lib/validateUser';

const prisma = new PrismaClient()

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {
	const user = await validateUser(request, prisma)

	if (!user) {
		return {
			status: 401
		}
	}

	return { body: prisma.channel.findMany({
			where: {
				OR: [{
					channelType: 0
				},
				{
					channelType: 1,
					userId: user.id
				}]
			}
		})
	}

}
export async function post(request: ServerRequest): Promise<void | EndpointOutput> {

	const user = validateUser(request, prisma)

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
	let channel
	try {
		const bodyAsString = request.body.toString()
		console.log(bodyAsString)
		channel = JSON.parse(bodyAsString)
	} catch (e: unknown) {
		console.error(e)
		return {
			status: 400
		}
	}

	channel.name = channel.name.trim()

	if (!channel.name || channel.name.length === 0) {
		return {
			status: 400
		}
	}

	channel.url = channel.url.trim()

	if (!channel.url || channel.url.length === 0) {
		return {
			status: 400
		}
	}

	const dateCreated = new Date().toISOString()

	const foundOrCreatedTags = []
	for (const t of (channel.tags || [])) {
		try {
			const found = await prisma.tag.findFirst({
				where: {
					name: t.toLowerCase()
				}
			})
			if (found) {
				foundOrCreatedTags.push(found)
			} else {
				foundOrCreatedTags.push(await prisma.tag.create({
					data: {
						name: t,
						dateCreated: dateCreated,
						lastModified: dateCreated
					}
				}))
			}
		} catch (e: unknown) {
			console.error(e)
		}
	}

	delete channel.id
	if (foundOrCreatedTags.length > 0) {
		channel.tags = foundOrCreatedTags
	}
	channel.dateCreated = dateCreated
	channel.lastModified = dateCreated
	channel.channelType = ChannelType.PRIVATE.valueOf()
	channel.userId = user.id

	let created;
	try {
		created = await prisma.channel.create({
			data: channel
		})
	} catch (e: unknown) {
		console.error(e)
	}

	if (!created) {
		return {
			status: 500
		}
	}

	created.positions = []

	return {
		status: 201,
		body: created
	}
}

