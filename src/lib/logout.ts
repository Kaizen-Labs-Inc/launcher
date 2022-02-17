import { goto } from '$app/navigation';
import { userStore } from '../stores/userStore';
import { variables } from '$lib/env';

export const logout = async () => {
	userStore.set({ loading: true, user: undefined });
	await fetch("/api/auth/logout", {
		method: 'POST',
		credentials: 'include'
	})
	if (variables.logoutUrl) {
		// note this assumes the logout URL is external;
		// otherwise, the user will experience an infinite spinner
		goto(variables.logoutUrl);
	} else {
		userStore.set({ loading: false, user: undefined });
		goto('/');
	}
};
