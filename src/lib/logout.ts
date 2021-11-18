import { signOut } from 'sk-auth/client';
import { session } from '$app/stores';
import { goto } from '$app/navigation';

export const logout = () => {
	signOut();
	session.set(undefined);
	goto('/');
};
