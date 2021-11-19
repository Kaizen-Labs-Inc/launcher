import { signOut } from 'sk-auth/client';
import { goto } from '$app/navigation';
import { userStore } from '../stores/userStore';

export const logout = () => {
	signOut();
	userStore.set(undefined);
	goto('/');
};
