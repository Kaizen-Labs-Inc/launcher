export default interface Workspace {
	id: string;
	name: string;
	url?: string;
	ownerUserId: string; // Creator of the workspace. Can delete the workspace.
	planId: string; // the Stripe plan (free | team | enterprise)
	// TODO add more payment properties
}
