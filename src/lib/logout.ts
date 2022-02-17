import { goto } from '$app/navigation';
import { userStore } from '../stores/userStore';

export const logout = async () => {
	await fetch("/api/auth/logout", {
		method: 'POST',
		credentials: 'include'
	})
	userStore.set({ loading: false, user: undefined });
	goto(import.meta.env.VITE_LOGOUT_URL || '/');
};
