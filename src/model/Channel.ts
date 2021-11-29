export default interface Channel {
	id?: number;
	name: string;
	url: string;
	emoji?: string,
	description?: string;
	image?: string;
}

export const mockChannels = [
	{
		id: 1,
		emoji: '✉️',
		image: '../../../icons/gmail.svg',
		name: 'Gmail',
		url: 'mail.google.com',
		tags: ['email', 'google']
	},
	{
		id: 2,
		emoji: '🗓',
		image: '../../../icons/gcal.svg',
		name: 'Calendar',
		url: 'calendar.google.com',
		tags: ['google', 'gsuite']
	},

	{
		id: 3,
		emoji: '💬',
		image: '../../../icons/slack.svg',
		draftIconImageUrl: '../../../icons/draft/icon-slack-draft.svg',
		name: 'Slack',
		url: 'slack.com',
		description: 'Real-time comms'
	},
	{
		id: 4,
		emoji: '📓',
		image: '../../../icons/notion.svg',
		name: 'Notion',
		url: 'notion.so',
		description: 'Docs and notes',
		tags: ['product', 'docs']
	},
	{
		id: 5,
		emoji: '📬',
		image: '../../../icons/intercom.svg',
		draftIconImageUrl: '../../../icons/draft/icon-intercom-draft.svg',
		name: 'Intercom',
		url: 'intercom.io',
		description: 'Customer messaging (email & push)',
		tags: ['marketing', 'push', 'email']
	},
	{
		id: 6,
		emoji: '🖇',
		image: '../../../icons/trello.svg',
		name: 'Trello',
		url: 'trello.com',
		description: 'Feature tracking for POs',
		tags: ['product']
	},
	{
		id: 7,
		emoji: '📈',
		image: '../../../icons/tableau.svg',
		draftIconImageUrl: '../../../icons/draft/icon-tableau-draft.svg',
		name: 'Tableau',
		url: 'tableau.com',
		description: 'Product analytics',
		tags: ['product', 'data']
	},
	{
		id: 8,
		emoji: '💸',
		image: '../../../icons/workday.svg',
		draftIconImageUrl: '../../../icons/draft/icon-workday-draft.svg',
		name: 'Workday',
		url: 'workday.com',
		description: 'HR, pay, and IT',
		tags: ['HR', 'IT']
	},
	{
		id: 9,
		emoji: '☎',
		image: '../../../icons/zendesk.svg',
		draftIconImageUrl: '../../../icons/draft/icon-zendesk-draft.svg',
		name: 'Zendesk',
		url: 'zendesk.com',
		description: 'Customer support',
		tags: ['CS']
	},
	{
		id: 10,
		emoji: '💼',
		image: '../../../icons/figma.svg',
		draftIconImageUrl: '../../../icons/draft/icon-figma-draft.svg',
		name: 'Figma',
		url: 'figma.com',
		description: 'Sales tracking',
		tags: ['sales']
	},

	{
		id: 11,
		emoji: '💼',
		image: '../../../icons/marketo.svg',
		draftIconImageUrl: '../../../icons/draft/icon-marketo-draft.svg',
		name: 'Marketo',
		url: 'marketo.com',
		description: 'Sales tracking',
		tags: ['sales']
	},
	{
		id: 12,
		emoji: '💼',
		image: '../../../icons/github.svg',
		draftIconImageUrl: '../../../icons/draft/icon-github-draft.svg',
		name: 'Github',
		url: 'github.com',
		description: 'Sales tracking',
		tags: ['sales']
	}
];
