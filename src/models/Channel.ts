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
		url: 'mail.google.com'
	},
	{
		id: '2',
		icon: '🗓',
		title: 'Calendar',
		url: 'calendar.google.com'
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
		description: 'Docs and notes'
	},
	{
		id: '5',
		icon: '📬',
		title: 'Customer.io',
		url: 'customer.io',
		description: 'Customer messaging (email & push)'
	},
	{
		id: '6',
		icon: '🖇',
		title: 'Trello',
		url: 'trello.com',
		description: 'Feature tracking for POs'
	},
	{
		id: '7',
		icon: '📈',
		title: 'Mixpanel',
		url: 'mixpanel.com',
		description: 'Product analytics'
	},
	{
		id: '8',
		icon: '💸',
		title: 'Rippling',
		url: 'rippling.com',
		description: 'HR, pay, and IT'
	},
	{
		id: '9',
		icon: '☎',
		title: 'Zendesk',
		url: 'zendesk.com',
		description: 'Customer support'
	},
	{
		id: '10',
		icon: '💼',
		title: 'Salesforce',
		url: 'salesforce.com',
		description: 'Sales tracking'
	}
];
