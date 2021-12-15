import { backdropOptions } from '../model/Backdrop';
import type { Backdrop } from '../model/Backdrop';
import { writable } from 'svelte/store';
export const backdropStore = writable<Backdrop>(backdropOptions[0]);
