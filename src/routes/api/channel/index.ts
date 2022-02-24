import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { prisma } from '$lib/prismaClient';
import { ChannelType } from '../../../model/ChannelType';
import validateUser from '$lib/validateUser';
import stripPrefix from '$lib/stripPrefix';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from '$lib/responseConstants';
import transformChannels from '$lib/transformChannels';

export const CHANNEL_SELECTIONS = {
	tags: true
}

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {
	const user = await validateUser(request, prisma)

	const searchConditions: any = [{ channelType: 0 }]
	if (user) {
		searchConditions.push({ channelType: ChannelType.PRIVATE.valueOf(), userId: user?.id })
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
		searchConditions.push({ channelType: ChannelType.ORGANIZATION.valueOf(), organizationId: role.organization.id })
	}

	const channels = await prisma.channel.findMany({
		where: {
			OR: searchConditions
		},
		include: CHANNEL_SELECTIONS
	})

	transformChannels(channels, user)

	return { body: channels
	}
}

export async function post(request: ServerRequest): Promise<void | EndpointOutput> {

	const user = await validateUser(request, prisma)

	if (!user) {
		return UNAUTHORIZED
	}

	if (!request.body) {
		return BAD_REQUEST
	}
	let channel
	try {
		channel = JSON.parse(request.body.toString())
	} catch (e: unknown) {
		console.error(e)
		return BAD_REQUEST
	}
	channel.userId = user.id;

	const role = await prisma.role.findFirst({
		where: {
			userId: user.id
		},
		select: {
			organization: true
		}
	});

	// if user is in an organizaton, set the visibility to ORGANIZATION
	if (role) {
		channel.channelType = ChannelType.ORGANIZATION.valueOf()
		channel.organization = { connect: { id: role.organization.id }}
	} else {
		channel.channelType = ChannelType.PRIVATE.valueOf()
	}

	channel.name = channel.name?.trim()

	if (!channel.name || channel.name.length === 0) {
		return BAD_REQUEST
	}

	channel.url = stripPrefix(channel.url?.trim())

	if (!channel.url || channel.url.length === 0) {
		return BAD_REQUEST
	}

	const foundChannel = await prisma.channel.findFirst({
		where: {
			url: channel.url
		},
		include: CHANNEL_SELECTIONS
	})

	if (foundChannel) {
		return {
			// conflict
			status: 409,
			body: channel
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
	channel.user = { connect: { id: user.id }}
	delete channel.userId

	let created;
	try {
		created = await prisma.channel.create({
			data: channel
		})
	} catch (e: unknown) {
		console.error(e)
	}

	if (!created) {
		return INTERNAL_SERVER_ERROR
	}

	created.positions = []

	transformChannels([created], user)

	return {
		status: 201,
		body: created
	}
}

