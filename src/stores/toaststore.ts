import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import type Toast from '../models/Toast';
export const toasts = writable([]);

export const addToast = (toast: Toast) => {
	// Create a unique ID so we can easily find/remove it
	// if it is dismissible/has a timeout.
	const id = uuidv4();

	// Setup some sensible defaults for a toast.
	const defaults: Toast = {
		id,
		type: 'info',
		dismissible: false,
		timeout: 3000 // TODO these defaults don't seem to be working
	};

	// Push the toast to the top of the list of toasts
	toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

	// If toast is dismissible, dismiss it after "timeout" amount of time.
	if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id: string) => {
	toasts.update((all) => all.filter((t) => t.id !== id));
};
