import type Invitation from '../../../launcher-subscription/src/model/Invitation';

export default interface Organization {
	id: number;
	name: string;
	slug: string;
	subscriptionId: number;
	invitations: Invitation[];
	dateCreated: string;
	lastModified: string;
}
