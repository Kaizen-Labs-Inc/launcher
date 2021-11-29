import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { PrismaClient } from '@prisma/client'
import type { User, Channel } from '@prisma/client';
import getAuth from '$lib/getAuth';
import { ChannelType } from '../../model/ChannelType';
import { BoardType } from '../../model/api/BoardType';

const prisma = new PrismaClient()
const defaultChannels = [
	{
		image: 'icons/gmail.svg',
		name: 'Gmail',
		url: 'mail.google.com',
		channelType: ChannelType.DEFAULT.valueOf(),
	},
	{
		image: 'icons/gcal.svg',
		name: 'Calendar',
		url: 'calendar.google.com',
		channelType: ChannelType.DEFAULT.valueOf(),
	},

	{
		image: 'icons/slack.svg',
		name: 'Slack',
		url: 'slack.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Real-time comms'
	},
	{
		image: 'icons/notion.svg',
		name: 'Notion',
		url: 'notion.so',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Docs and notes',
	},
	{
		image: 'icons/intercom.svg',
		name: 'Intercom',
		url: 'intercom.io',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Customer messaging (email & push)',
	},
	{
		image: 'icons/trello.svg',
		name: 'Trello',
		url: 'trello.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Feature tracking for POs',
	},
	{
		image: 'icons/tableau.svg',
		name: 'Tableau',
		url: 'tableau.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Product analytics',
	},
	{
		image: 'icons/workday.svg',
		name: 'Workday',
		url: 'workday.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'HR, pay, and IT',
	},
	{
		image: 'icons/zendesk.svg',
		name: 'Zendesk',
		url: 'zendesk.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Customer support',
	},
	{
		image: 'icons/figma.svg',
		name: 'Figma',
		url: 'figma.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Sales tracking',
	},

	{
		image: 'icons/marketo.svg',
		name: 'Marketo',
		url: 'marketo.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Sales tracking',
	},
	{
		image: 'icons/github.svg',
		name: 'Github',
		url: 'github.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Sales tracking',
	}
];


export async function get(request: ServerRequest): Promise<void | EndpointOutput> {

		let defaultBoard: any = await prisma.board.findFirst({
			where: {
				boardType: 0
			},
			select: {
				boardChannels: {
					select: {
						channel: true
					}
				}
			}

		})
		if (!defaultBoard) {
			console.log("creating default board")
			defaultBoard = await prisma.board.create({
				data: {
					boardType: BoardType.DEFAULT.valueOf()
				}
			})
			const allChannels = await Promise.all(defaultChannels.map(it => {
				return prisma.channel.create({
					data: it
				})
			}))
			const boardChannels = await Promise.all(allChannels.map((it, idx) => {
				return prisma.boardChannel.create({
					data: {
						channelId: it.id,
						boardId: defaultBoard.id,
						position: idx
					}
				})
			}))
		}

	return { body: defaultBoard }
}

