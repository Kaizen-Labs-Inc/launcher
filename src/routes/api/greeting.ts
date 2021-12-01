import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { PrismaClient } from '@prisma/client';
import { ChannelType } from '../../model/ChannelType';
import { BoardType } from '../../model/api/BoardType';
import { mockChannels } from '../../model/MockChannel';

const prisma = new PrismaClient();

export async function get(request: ServerRequest): Promise<void | EndpointOutput> {

	let defaultBoard: any = await prisma.board.findFirst({
		where: {
			boardType: 0
		},
		select: {
			positions: {
				select: {
					channel: true
				}
			}
		}

	});
	if (!defaultBoard) {
		const dateCreated = new Date().toISOString();
		console.log('creating default board');
		defaultBoard = await prisma.board.create({
			data: {
				boardType: BoardType.DEFAULT.valueOf(),
				dateCreated: dateCreated,
				lastModified: dateCreated
			}
		});
		const tags = Array.from(new Set(mockChannels.map(it => it.tags).flat()))

		const allTags = await Promise.all(tags.map(it => {
			return prisma.tag.create({
				data: { name: it, dateCreated: dateCreated, lastModified: dateCreated }
			});
		}));

		const allChannels = await Promise.all(mockChannels.map(it => {
			return prisma.channel.create({
				data: {
					name: it.title,
					url: it.url,
					image: it.iconImageUrl,
					channelType: ChannelType.DEFAULT.valueOf(),
					emoji: it.emoji,
					description: it.description,
					dateCreated: dateCreated,
					lastModified: dateCreated,
					tags: {
						connect: it.tags.map(t => {
							const found = allTags.find(at => at.name === t)
							return { id: found.id }
						})
					}
				}
			});
		}));

		const positions = await Promise.all(allChannels.map((it, idx) => {
			return prisma.position.create({
				data: {
					channelId: it.id,
					boardId: defaultBoard.id,
					position: idx,
					dateCreated: dateCreated,
					lastModified: dateCreated
				}
			});
		}));
	}

	return { body: defaultBoard };
}

