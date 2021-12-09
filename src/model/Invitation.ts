import type { User } from 'sk-auth';
import type Organization from './Organization';

export default interface Invitation {
	id: number
	slug: string
	user: User
	userId: number
	organization: Organization
	inviteeEmail: string
	inviteeName?: string
	organizationId: number
	dateCreated: string
	lastModified: string
}
