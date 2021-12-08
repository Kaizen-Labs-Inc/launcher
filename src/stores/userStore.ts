import { writable } from 'svelte/store';
import type GoogleUser from '../model/api/GoogleUser';

export const userStore = writable<UserStatus>({ loading: true, user: undefined });

export interface UserStatus {
	loading: boolean;
	user?: GoogleUser;
}
