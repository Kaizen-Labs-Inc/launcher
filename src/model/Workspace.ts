export default interface Workspace {
	id: string;
	name: string;
	url?: string;
	domain: string;
	ownerUserId: string; // Creator of the workspace. Can delete the workspace.
	planId: string; // the Stripe plan (free | team | enterprise)
	// TODO add more payment properties
}

export const sampleWorkspace: Workspace = {
	id: '1',
	name: 'Kaizen Labs',
	url: 'https://kaizenlabs.dev',
	domain: 'kaizenlabs.dev',
	ownerUserId: '123',
	planId: '123'
};
