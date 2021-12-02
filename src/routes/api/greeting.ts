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
		const tags = Array.from(new Set(mockChannels.map(it => it.tags).flat())).filter(it => it !== undefined)
		console.log(tags)

		const allTags = await Promise.all(tags.map(it => {
			return prisma.tag.create({
				data: { name: it, dateCreated: dateCreated, lastModified: dateCreated }
			});
		}));

		const allChannels = await Promise.all(mockChannels.map(it => {
			const d: any = {
				name: it.title,
				url: it.url,
				image: it.iconImageUrlDark ? it.iconImageUrlDark : it.iconImageUrl,
				channelType: ChannelType.DEFAULT.valueOf(),
				emoji: it.emoji,
				description: it.description,
				dateCreated: dateCreated,
				lastModified: dateCreated,
			}
			if (it.tags) {
				d.tags = {
					connect: it.tags.map(t => {
						const found = allTags.find(at => at.name === t)
						return { id: found.id }
					})
				}
			}
			return prisma.channel.create({
				data: d
			});
		}));

		await Promise.all(allChannels.map(it => {
			const mockChannel = mockChannels.find(c => c.title === it.name)
			if (typeof mockChannel?.defaultBoardPosition !== 'undefined') {
				return prisma.position.create({
					data: {
						channelId: it.id,
						boardId: defaultBoard.id,
						position: mockChannel.defaultBoardPosition,
						dateCreated: dateCreated,
						lastModified: dateCreated
					}
				});
			}
		}));
	}

	return { body: defaultBoard };
}

