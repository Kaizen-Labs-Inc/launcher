import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { prisma } from '$lib/prismaClient';
import { ChannelType } from '../../../model/ChannelType';
import validateUser from '$lib/validateUser';
import stripPrefix from '$lib/stripPrefix';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from '$lib/responseConstants';

export const CHANNEL_SELECTIONS = {
	tags: true
}

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {
	const user = await validateUser(request, prisma)

	let id: number
	try {
		id = Number.parseInt(request.params.id)
	} catch (e) {
		console.error(e)
		return BAD_REQUEST
	}

	const searchConditions: any = [{ id: id, channelType: 0 }]
	if (user) {
		searchConditions.push({ id: id, channelType: 1, userId: user?.id })
	}

	let found
	try {
		found = await prisma.channel.findFirst({
			where: {
				OR: searchConditions
			},
			include: CHANNEL_SELECTIONS
		})
	} catch (e) {
		console.error(e)
		return INTERNAL_SERVER_ERROR
	}

	if (!found) {
		return NOT_FOUND
	}

	return {
		body: found
	}
}

export async function put(request: ServerRequest): Promise<void | EndpointOutput> {

	const user = await validateUser(request, prisma)
	let id: number
	try {
		id = Number.parseInt(request.params.id)
	} catch (e) {
		console.error(e)
		return BAD_REQUEST
	}

	if (!user) {
		return UNAUTHORIZED
	}

	if (!request.body) {
		console.log("no body")
		return BAD_REQUEST
	}

	let channel
	try {
		channel = JSON.parse(request.body.toString())
	} catch (e: unknown) {
		console.error(e)
		return BAD_REQUEST
	}

	channel.name = channel.name?.trim()

	if (!channel.name || channel.name.length === 0) {
		console.log("no channel name")
		return BAD_REQUEST
	}

	channel.url = stripPrefix(channel.url?.trim())

	if (!channel.url || channel.url.length === 0) {
		console.log("no url")
		return BAD_REQUEST
	}

	const searchConditions: any = { id: id, channelType: 1, userId: user?.id }

	const found = await prisma.channel.findFirst({
		where: searchConditions,
		include: CHANNEL_SELECTIONS
	})

	if (!found) {
		console.log("no channel found")
		return NOT_FOUND
	}

	const lastModified = new Date().toISOString()

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
						dateCreated: lastModified,
						lastModified: lastModified
					}
				}))
			}
		} catch (e: unknown) {
			console.error(e)
		}
	}

	// todo get tag update working
	delete channel.tags
	if (false && foundOrCreatedTags.length > 0) {
		channel.tags = foundOrCreatedTags
	}

	channel.lastModified = lastModified

	let updated;
	try {
		updated = await prisma.channel.update({
			data: channel,
			where: { id: id }
		})
	} catch (e: unknown) {
		console.error(e)
	}

	if (!updated) {
		return INTERNAL_SERVER_ERROR
	}
	return {
		status: 200,
		body: updated
	}
}

