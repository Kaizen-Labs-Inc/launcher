import type { Backdrop } from '../model/Backdrop';
import { writable } from 'svelte/store';
export const backdropStore = writable<Backdrop>({
	id: Number.MAX_VALUE, // A default backdrop while loading
	animated: false,
	darkMode: true,
	colors: [{value:'#283E8E'}]
});
