import type EmailDomain from './EmailDomain';
import type Invitation from './Invitation';

export default interface Organization {
	id: number;
	name: string;
	slug: string;
	domainRestricted: boolean;
	subscriptionId: number;
	emailDomains: EmailDomain[];
	invitations: Invitation[];
	dateCreated: string;
	lastModified: string;
}
