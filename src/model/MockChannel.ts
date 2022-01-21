export default interface MockChannel {
	id?: string;
	title: string;
	url?: string;
	description?: string;
	defaultBoardPosition?: number;
	icon?: string;
	emoji?: string;
	iconImageUrl?: string;
	iconImageUrlDark?: string;
	draftIconImageUrl?: string;
	tags?: string[];
}

export const mockChannels = [
	{
		id: '1',
		emoji: '✉️',
		iconImageUrl: '../../../icons/gmail.svg',
		title: 'Gmail',
		defaultBoardPosition: 0,
		url: 'mail.google.com',
		tags: ['email', 'google']
	},
	{
		id: '2',
		emoji: '🗓',
		iconImageUrl: '../../../icons/gcal.svg',
		title: 'Calendar',
		defaultBoardPosition: 1,
		url: 'calendar.google.com',
		tags: ['google', 'gsuite']
	},

	{
		id: '3',
		emoji: '💬',
		iconImageUrl: '../../../icons/slack.svg',
		draftIconImageUrl: '../../../icons/draft/icon-slack-draft.svg',
		defaultBoardPosition: 2,
		title: 'Slack',
		url: 'slack.com',
		description: 'Real-time comms'
	},
	{
		id: '4',
		emoji: '📓',
		iconImageUrl: '../../../icons/notion-dark.svg',
		title: 'Notion',
		url: 'notion.so',
		description: 'Docs and notes',
		tags: ['product', 'docs']
	},
	{
		id: '5',
		emoji: '📬',
		iconImageUrl: '../../../icons/intercom.svg',
		draftIconImageUrl: '../../../icons/draft/icon-intercom-draft.svg',
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
		draftIconImageUrl: '../../../icons/draft/icon-tableau-draft.svg',
		title: 'Tableau',
		url: 'tableau.com',
		description: 'Product analytics',
		tags: ['product', 'data']
	},
	{
		id: '8',
		emoji: '💸',
		iconImageUrl: '../../../icons/workday.svg',
		draftIconImageUrl: '../../../icons/draft/icon-workday-draft.svg',
		title: 'Workday',
		url: 'workday.com',
		description: 'HR, pay, and IT',
		tags: ['hr', 'it']
	},
	{
		id: '9',
		emoji: '☎',
		iconImageUrl: '../../../icons/zendesk.svg',
		iconImageUrlDark: '../../../icons/zendesk-dark.svg',
		draftIconImageUrl: '../../../icons/draft/icon-zendesk-draft.svg',
		title: 'Zendesk',
		url: 'zendesk.com',
		description: 'Customer support',
		tags: ['cs']
	},
	{
		id: '10',
		emoji: '💼',
		iconImageUrl: '../../../icons/figma.svg',
		draftIconImageUrl: '../../../icons/draft/icon-figma-draft.svg',
		defaultBoardPosition: 3,
		title: 'Figma',
		url: 'figma.com',
		description: 'Product design',
		tags: ['design']
	},

	{
		id: '11',
		emoji: '💼',
		iconImageUrl: '../../../icons/marketo.svg',
		draftIconImageUrl: '../../../icons/draft/icon-marketo-draft.svg',
		title: 'Marketo',
		url: 'marketo.com',
		description: 'Sales tracking',
		tags: ['sales']
	},
	{
		id: '12',
		emoji: '💼',
		iconImageUrl: '../../../icons/github.svg',
		iconImageUrlDark: '../../../icons/github-dark.svg',
		draftIconImageUrl: '../../../icons/draft/icon-github-draft.svg',
		defaultBoardPosition: 4,
		title: 'Github',
		url: 'github.com',
		description: 'Cloud git hosting',
		tags: ['engineering']
	},
	{
		id: '13',
		iconImageUrl: '../../../icons/airtable.svg',
		title: 'Airtable',
		url: 'airtable.com',
		description: 'Collaborative database',
		tags: ['customer success']
	},
	{
		id: '14',
		iconImageUrl: '../../../icons/angellist.svg',
		title: 'AngelList',
		url: 'angellist.com',
		description: 'Financing & investor relations',
		tags: ['financing']
	},
	{
		id: '15',
		iconImageUrl: '../../../icons/asana.svg',
		title: 'Asana',
		url: 'asana.com',
		description: 'Project tracking',
		tags: ['product']
	},
	{
		id: '16',
		iconImageUrl: '../../../icons/basecamp.svg',
		iconImageUrlDark: '../../../icons/basecamp-dark.svg',
		title: 'Basecamp',
		url: 'basecamp.com',
		description: 'Project management',
		tags: ['product']
	},
	{
		id: '17',
		iconImageUrl: '../../../icons/brave.svg',
		title: 'Brave',
		url: 'brave.com',
		description: 'Secure browsing',
		tags: ['browser']
	},
	{
		id: '18',
		iconImageUrl: '../../../icons/chrome.svg',
		title: 'Chrome',
		url: 'google.com/chrome',
		description: 'Browser',
		tags: ['customer success']
	},
	{
		id: '19',
		iconImageUrl: '../../../icons/confluence.svg',
		title: 'Confluence',
		url: 'atlassian.com',
		description: 'Documentation',
		tags: ['engineering']
	},
	{
		id: '20',
		iconImageUrl: '../../../icons/evernote.svg',
		title: 'Evernote',
		url: 'evernote.com',
		description: 'Shared notes',
		tags: ['sales']
	},
	{
		id: '21',
		iconImageUrl: '../../../icons/hubspot.svg',
		title: 'Hubspot',
		url: 'hubspot.com',
		description: 'CRM',
		tags: ['customer success', 'sales']
	},

	{
		id: '23',
		iconImageUrl: '../../../icons/mixpanel.svg',
		title: 'Mixpanel',
		url: 'mixpanel.com',
		description: 'Product analytics',
		tags: ['sales']
	},
	{
		id: '24',
		iconImageUrl: '../../../icons/salesforce.svg',
		title: 'Salesforce',
		url: 'salesforce.com',
		description: 'CRM',
		tags: ['crm']
	},
	{
		id: '25',
		iconImageUrl: '../../../icons/sentry.svg',
		title: 'Sentry',
		url: 'sentry.io',
		description: 'Bug tracking and reporting',
		tags: ['dev']
	},
	{
		id: '26',
		iconImageUrl: '../../../icons/twitter.svg',
		title: 'Twitter',
		url: 'twitter.com',
		description: 'Social media',
		tags: ['marketing']
	},
	{
		id: '27',
		iconImageUrl: '../../../icons/customer-io.svg',
		title: 'Customer.io',
		url: 'customer.io',
		description: 'Customer messaging platform',
		tags: ['marketing', 'messaging']
	},
	{
		id: '28',
		iconImageUrl: '../../../icons/canva.svg',
		title: 'Canva',
		url: 'canva.com',
		description: 'Drag-and-drop designer in the browser',
		tags: ['marketing', 'design']
	},
	{
		id: '29',
		iconImageUrl: '../../../icons/hopin.svg',
		title: 'Hopin',
		url: 'hopin.com',
		description: 'Event planning platform',
		tags: ['events']
	},
	{
		id: '30',
		iconImageUrl: '../../../icons/databricks.png',
		title: 'Databricks',
		url: 'databricks.com',
		description: 'Data warehouse and data lakes platform',
		tags: ['data', 'engineering']
	},
	{
		id: '31',
		iconImageUrl: '../../../icons/zapier.svg',
		title: 'Zapier',
		url: 'zapier.com',
		description: 'Internal tools and automation',
		tags: ['internal', 'workflows']
	},
	{
		id: '32',
		iconImageUrl: '../../../icons/mailchimp.svg',
		title: 'Mailchimp',
		url: 'mailchimp.com',
		description: 'Email marketing and newsletters',
		tags: ['email', 'marketing']
	},
	{
		id: '33',
		iconImageUrl: '../../../icons/samsara.svg',
		title: 'Samsara',
		url: 'samsara.com',
		description: 'IT operations',
		tags: ['IT', 'operations']
	},
	{
		id: '34',
		iconImageUrl: '../../../icons/gusto.svg',
		title: 'Gusto',
		url: 'gusto.com',
		description: 'HR, payroll, and benefits',
		tags: ['hr']
	},
	{
		id: '35',
		iconImageUrl: '../../../icons/calendly.png',
		title: 'Calendly',
		url: 'calendly.com',
		description: 'Event planning platform',
		tags: ['events']
	},
	{
		id: '36',
		iconImageUrl: '../../../icons/hopin.svg',
		title: 'Amplitude',
		url: 'amplitude.com',
		description: 'Product analytics and analysis',
		tags: ['product', 'analytics']
	},
	{
		id: '37',
		iconImageUrl: '../../../icons/vercel.svg',
		title: 'Vercel',
		url: 'vercel.com',
		description: 'Frontend, static sites, and serverless',
		tags: ['dev']
	},
	{
		id: '38',
		iconImageUrl: '../../../icons/aws.svg',
		title: 'Amazon Web Services',
		url: 'aws.amazon.com',
		description: 'Platform infrastructure',
		tags: ['dev']
	},
	{
		id: '39',
		iconImageUrl: '../../../icons/azure.svg',
		title: 'Microsoft Azure',
		url: 'azure.microsoft.com',
		description: 'Platform infrastructure',
		tags: ['dev']
	},
	{
		id: '40',
		iconImageUrl: '../../../icons/gcp.svg',
		title: 'Google Cloud Platform',
		url: 'console.cloud.google.com',
		description: 'Frontend, static sites, and serverless',
		tags: ['dev']
	},
	{
		id: '41',
		iconImageUrl: '../../../icons/ga.svg',
		title: 'Google Analytics',
		url: 'analytics.google.com',
		description: 'Product analytics',
		tags: ['analytics', 'marketing']
	},
	{
		id: '42',
		iconImageUrl: '../../../icons/snowflake.svg',
		title: 'Snowflake',
		url: 'snowflake.com',
		description: 'Data warehouse',
		tags: ['analytics', 'marketing']
	}
];
