export default interface Channel {
	id: string;
	title: string;
	url: string;
	description?: string;
	icon?: string; // TODO support image paths and/or emojis
	tags?: string[];
}

export const mockChannels = [
	{
		id: '1',
		icon: '✉️',
		title: 'Gmail',
		url: 'mail.google.com',
		tags: ['email', 'google']
	},
	{
		id: '2',
		icon: '🗓',
		title: 'Calendar',
		url: 'calendar.google.com',
		tags: ['google', 'gsuite']
	},

	{
		id: '3',
		icon: '💬',
		title: 'Slack',
		url: 'slack.com',
		description: 'Real-time comms'
	},
	{
		id: '4',
		icon: '📓',
		title: 'Notion',
		url: 'notion.so',
		description: 'Docs and notes',
		tags: ['product', 'docs']
	},
	{
		id: '5',
		icon: '📬',
		title: 'Customer.io',
		url: 'customer.io',
		description: 'Customer messaging (email & push)',
		tags: ['marketing', 'push', 'email']
	},
	{
		id: '6',
		icon: '🖇',
		title: 'Trello',
		url: 'trello.com',
		description: 'Feature tracking for POs',
		tags: ['product']
	},
	{
		id: '7',
		icon: '📈',
		title: 'Mixpanel',
		url: 'mixpanel.com',
		description: 'Product analytics',
		tags: ['product', 'data']
	},
	{
		id: '8',
		icon: '💸',
		title: 'Rippling',
		url: 'rippling.com',
		description: 'HR, pay, and IT',
		tags: ['HR', 'IT']
	},
	{
		id: '9',
		icon: '☎',
		title: 'Zendesk',
		url: 'zendesk.com',
		description: 'Customer support',
		tags: ['CS']
	},
	{
		id: '10',
		icon: '💼',
		title: 'Salesforce',
		url: 'salesforce.com',
		description: 'Sales tracking',
		tags: ['sales']
	}
];
