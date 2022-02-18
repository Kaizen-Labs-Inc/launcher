import type { RequestEvent } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { prisma } from '$lib/prismaClient';
import { ChannelType } from '../../model/ChannelType';
import { BoardType } from '../../model/api/BoardType';
import { mockChannels } from '../../model/MockChannel';
import { backdropOptions } from '../../model/Backdrop';
const BOARD_SELECTIONS = {
	id: true,
	positions: {
		select: {
			channel: true
		}
	}
};

export async function get(event: RequestEvent): Promise<void | EndpointOutput> {
	let defaultBoard: any = await prisma.board.findFirst({
		where: {
			boardType: 0
		},
		select: BOARD_SELECTIONS
	});
	const dateCreated = new Date().toISOString();
	if (!defaultBoard) {
		console.log('creating default board');

		await prisma.board.create({
			data: {
				boardType: BoardType.DEFAULT.valueOf(),
				dateCreated: dateCreated,
				lastModified: dateCreated
			}
		});

		defaultBoard = await prisma.board.findFirst({
			where: {
				boardType: 0
			},
			select: BOARD_SELECTIONS
		});

		const tags = Array.from(new Set(mockChannels.map((it) => it.tags).flat())).filter(
			(it) => it !== undefined
		);

		for (const it of tags) {
			await prisma.tag.create({
				data: { name: it, dateCreated: dateCreated, lastModified: dateCreated }
			});
		}

		const allTags = await prisma.tag.findMany({});

		for (const it of mockChannels) {
			const d: any = {
				name: it.title,
				url: it.url,
				image: it.iconImageUrlDark ? it.iconImageUrlDark : it.iconImageUrl,
				channelType: ChannelType.DEFAULT.valueOf(),
				emoji: it.emoji,
				description: it.description,
				dateCreated: dateCreated,
				lastModified: dateCreated
			};
			if (it.tags && false) {
				d.tags = {
					connect: it.tags.map((t) => {
						const found = allTags.find((at) => at.name === t);
						console.log(`Linking ${it.title} to ${JSON.stringify(found)}`);
						return { id: found.id };
					})
				};
			}
			await prisma.channel.create({
				data: d
			});
		}
	}

	const backdrops = await prisma.backdrop.findMany({
		include: {
			colors: true
		}
	});
	if (backdrops.length === 0) {
		for (const it of backdropOptions) {
			const d: any = {
				animated: it.animated,
				darkMode: it.darkMode,
				colors: {
					create: it.colors
				},
				dateCreated: dateCreated,
				lastModified: dateCreated
			};

			await prisma.backdrop.create({
				data: d
			});
		}
	}
	if (defaultBoard.positions.length === 0) {
		const allChannels = await prisma.channel.findMany({});

		for (const it of allChannels) {
			const mockChannel = mockChannels.find((c) => c.title === it.name);
			console.log({
				data: {
					channelId: it.id,
					boardId: defaultBoard.id,
					position: mockChannel.defaultBoardPosition,
					dateCreated: dateCreated,
					lastModified: dateCreated
				}
			});
			if (typeof mockChannel?.defaultBoardPosition !== 'undefined') {
				await prisma.position.create({
					data: {
						channel: {
							connect: { id: it.id }
						},
						board: {
							connect: { id: defaultBoard.id }
						},
						position: mockChannel.defaultBoardPosition,
						dateCreated: dateCreated,
						lastModified: dateCreated
					}
				});
			}
		}
	}

	return { body: defaultBoard };
}
