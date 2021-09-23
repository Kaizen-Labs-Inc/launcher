export default interface Channel {
	id: string;
	title: string;
	url: string;
	description?: string;
	icon?: string; // TODO support image paths and/or emojis
}

export const mockChannels = [
	{
		id: '1',
		icon: '✉️',
		title: 'Gmail',
		url: 'mail.google.com',
		description: 'Lorem ipsum'
	},
	{
		id: '2',
		icon: '🗓',
		title: 'Calendar',
		url: 'calendar.google.com',

		description: 'Lorem ipsum'
	},

	{
		id: '3',
		icon: '💬',
		title: 'Slack',
		url: 'slack.com',
		description: 'Lorem ipsum'
	},
	{
		id: '4',
		icon: '📓',
		title: 'Notion',
		url: 'notion.so',
		description: 'Lorem ipsum'
	},
	{
		id: '5',
		icon: '📬',
		title: 'Customer.io',
		url: 'customer.io',
		description: 'Lorem ipsum'
	},
	{
		id: '6',
		icon: '🖇',
		title: 'Trello',
		url: 'trello.com',
		description: 'Lorem ipsum'
	},
	{
		id: '7',
		icon: '📈',
		title: 'Mixpanel',
		url: 'mixpanel.com',
		description: 'Lorem ipsum'
	},
	{
		id: '8',
		icon: '💸',
		title: 'Rippling',
		url: 'rippling.com',
		description: 'Lorem ipsum'
	},
	{
		id: '9',
		icon: '☎',
		title: 'Zendesk',
		url: 'zendesk.com',
		description: 'Lorem ipsum'
	},
	{
		id: '10',
		icon: '💼',
		title: 'Salesforce',
		url: 'salesforce.com',
		description: 'Lorem ipsum'
	}
];
