import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint';
import { PrismaClient } from '@prisma/client';
import { ChannelType } from '../../model/ChannelType';
import { BoardType } from '../../model/api/BoardType';

const prisma = new PrismaClient();
const defaultChannels = [
	{
		image: 'icons/gmail.svg',
		name: 'Gmail',
		url: 'mail.google.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		tags: ['email', 'google']
	},
	{
		image: 'icons/gcal.svg',
		name: 'Calendar',
		url: 'calendar.google.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		tags: ['google', 'gsuite']
	},

	{
		image: 'icons/slack.svg',
		name: 'Slack',
		url: 'slack.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Real-time comms',
		tags: ['chat']
	},
	{
		image: 'icons/notion.svg',
		name: 'Notion',
		url: 'notion.so',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Docs and notes',
		tags: ['product', 'docs']
	},
	{
		image: 'icons/intercom.svg',
		name: 'Intercom',
		url: 'intercom.io',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Customer messaging (email & push)',
		tags: ['marketing', 'push', 'email']
	},
	{
		image: 'icons/trello.svg',
		name: 'Trello',
		url: 'trello.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Feature tracking for POs',
		tags: ['product']
	},
	{
		image: 'icons/tableau.svg',
		name: 'Tableau',
		url: 'tableau.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Product analytics',
		tags: ['product', 'data']
	},
	{
		image: 'icons/workday.svg',
		name: 'Workday',
		url: 'workday.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'HR, pay, and IT',
		tags: ['hr', 'it']
	},
	{
		image: 'icons/zendesk.svg',
		name: 'Zendesk',
		url: 'zendesk.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Customer support',
		tags: ['cs']
	},
	{
		image: 'icons/figma.svg',
		name: 'Figma',
		url: 'figma.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Graphic and UX design',
		tags: ['design']
	},

	{
		image: 'icons/marketo.svg',
		name: 'Marketo',
		url: 'marketo.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Sales tracking',
		tags: ['sales']
	},
	{
		image: 'icons/github.svg',
		name: 'Github',
		url: 'github.com',
		channelType: ChannelType.DEFAULT.valueOf(),
		description: 'Cloud git hosting',
		tags: ['git']
	}
];


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
		const tags = ['email', 'google', 'gsuite', 'product', 'docs', 'chat', 'marketing', 'push', 'email', 'data', 'hr', 'it', 'cs', 'sales', 'git', 'design'];

		const allTags = await Promise.all(tags.map(it => {
			return prisma.tag.create({
				data: { name: it, dateCreated: dateCreated, lastModified: dateCreated }
			});
		}));

		const allChannels = await Promise.all(defaultChannels.map(it => {
			return prisma.channel.create({
				data: Object.assign(it, {
					dateCreated: dateCreated,
					lastModified: dateCreated,
					tags: {
						connect: it.tags.map(t => {
							const found = allTags.find(at => at.name === t)
							return { id: found.id }
						})
					}
				})
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

