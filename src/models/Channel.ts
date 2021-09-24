export default interface Channel {
	id: string;
	title: string;
	url: string;
	description?: string;
	icon?: string; // TODO support image paths and/or emojis
	iconImageUrl?: string;
	tags?: string[];
}

export const mockChannels = [
	{
		id: '1',
		icon: '✉️',
		iconImageUrl: '../../../static/icons/gmail.svg',
		title: 'Gmail',
		url: 'mail.google.com',
		tags: ['email', 'google']
	},
	{
		id: '2',
		icon: '🗓',
		iconImageUrl: '../../../static/icons/gcal.svg',
		title: 'Calendar',
		url: 'calendar.google.com',
		tags: ['google', 'gsuite']
	},

	{
		id: '3',
		icon: '💬',
		iconImageUrl: '../../../static/icons/slack.svg',
		title: 'Slack',
		url: 'slack.com',
		description: 'Real-time comms'
	},
	{
		id: '4',
		icon: '📓',
		iconImageUrl: '../../../static/icons/notion.svg',
		title: 'Notion',
		url: 'notion.so',
		description: 'Docs and notes',
		tags: ['product', 'docs']
	},
	{
		id: '5',
		icon: '📬',
		iconImageUrl: '../../../static/icons/intercom.svg',
		title: 'Intercom',
		url: 'intercom.io',
		description: 'Customer messaging (email & push)',
		tags: ['marketing', 'push', 'email']
	},
	{
		id: '6',
		icon: '🖇',
		iconImageUrl: '../../../static/icons/trello.svg',
		title: 'Trello',
		url: 'trello.com',
		description: 'Feature tracking for POs',
		tags: ['product']
	},
	{
		id: '7',
		icon: '📈',
		iconImageUrl: '../../../static/icons/tableau.svg',
		title: 'Tableau',
		url: 'tableau.com',
		description: 'Product analytics',
		tags: ['product', 'data']
	},
	{
		id: '8',
		icon: '💸',
		iconImageUrl: '../../../static/icons/workday.svg',
		title: 'Workday',
		url: 'workday.com',
		description: 'HR, pay, and IT',
		tags: ['HR', 'IT']
	},
	{
		id: '9',
		icon: '☎',
		iconImageUrl: '../../../static/icons/zendesk.svg',
		title: 'Zendesk',
		url: 'zendesk.com',
		description: 'Customer support',
		tags: ['CS']
	},
	{
		id: '10',
		icon: '💼',
		iconImageUrl: '../../../static/icons/figma.svg',
		title: 'Figma',
		url: 'figma.com',
		description: 'Sales tracking',
		tags: ['sales']
	},

	{
		id: '11',
		icon: '💼',
		iconImageUrl: '../../../static/icons/marketo.svg',
		title: 'Marketo',
		url: 'marketo.com',
		description: 'Sales tracking',
		tags: ['sales']
	},
	{
		id: '12',
		icon: '💼',
		iconImageUrl: '../../../static/icons/github.svg',
		title: 'Github',
		url: 'github.com',
		description: 'Sales tracking',
		tags: ['sales']
	}
];
