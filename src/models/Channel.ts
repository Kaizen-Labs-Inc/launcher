export default interface Channel {
	id?: string;
	title: string;
	url?: string;
	description?: string;
	icon?: string;
	emoji?: string;
	iconImageUrl?: string;
	tags?: string[];
}

export const mockChannels = [
	{
		id: '1',
		emoji: '✉️',
		iconImageUrl: '../../../icons/gmail.svg',
		title: 'Gmail',
		url: 'mail.google.com',
		tags: ['email', 'google']
	},
	{
		id: '2',
		emoji: '🗓',
		iconImageUrl: '../../../icons/gcal.svg',
		title: 'Calendar',
		url: 'calendar.google.com',
		tags: ['google', 'gsuite']
	},

	{
		id: '3',
		emoji: '💬',
		iconImageUrl: '../../../icons/slack.svg',
		title: 'Slack',
		url: 'slack.com',
		description: 'Real-time comms'
	},
	{
		id: '4',
		emoji: '📓',
		iconImageUrl: '../../../icons/notion.svg',
		title: 'Notion',
		url: 'notion.so',
		description: 'Docs and notes',
		tags: ['product', 'docs']
	},
	{
		id: '5',
		emoji: '📬',
		iconImageUrl: '../../../icons/intercom.svg',
		title: 'Intercom',
		url: 'intercom.io',
		description: 'Customer messaging (email & push)',
		tags: ['marketing', 'push', 'email']
	},
	{
		id: '6',
		emoji: '🖇',
		iconImageUrl: '../../../icons/trello.svg',
		title: 'Trello',
		url: 'trello.com',
		description: 'Feature tracking for POs',
		tags: ['product']
	},
	{
		id: '7',
		emoji: '📈',
		iconImageUrl: '../../../icons/tableau.svg',
		title: 'Tableau',
		url: 'tableau.com',
		description: 'Product analytics',
		tags: ['product', 'data']
	},
	{
		id: '8',
		emoji: '💸',
		iconImageUrl: '../../../icons/workday.svg',
		title: 'Workday',
		url: 'workday.com',
		description: 'HR, pay, and IT',
		tags: ['HR', 'IT']
	},
	{
		id: '9',
		emoji: '☎',
		iconImageUrl: '../../../icons/zendesk.svg',
		title: 'Zendesk',
		url: 'zendesk.com',
		description: 'Customer support',
		tags: ['CS']
	},
	{
		id: '10',
		emoji: '💼',
		iconImageUrl: '../../../icons/figma.svg',
		title: 'Figma',
		url: 'figma.com',
		description: 'Sales tracking',
		tags: ['sales']
	},

	{
		id: '11',
		emoji: '💼',
		iconImageUrl: '../../../icons/marketo.svg',
		title: 'Marketo',
		url: 'marketo.com',
		description: 'Sales tracking',
		tags: ['sales']
	},
	{
		id: '12',
		emoji: '💼',
		iconImageUrl: '../../../icons/github.svg',
		title: 'Github',
		url: 'github.com',
		description: 'Sales tracking',
		tags: ['sales']
	}
];
