import { writable } from 'svelte/store';
import type GoogleUser from '../model/api/GoogleUser';

export const userStore = writable<GoogleUser>(undefined);
