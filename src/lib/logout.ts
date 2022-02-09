import { signOut } from 'sk-auth/client';
import { goto } from '$app/navigation';
import { userStore } from '../stores/userStore';

export const logout = () => {
	signOut();
	userStore.set({ loading: false, user: undefined });
	goto(import.meta.env.VITE_LOGOUT_URL || '/');
};
