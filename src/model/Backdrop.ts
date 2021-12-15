export interface Backdrop {
	id: number;
	default: boolean;
	animated: boolean;
	amplitude?: number;
	frequency?: number;
	darkMode: boolean;
	colors: string[];
}
export const backdropOptions: Backdrop[] = [
	{ id: 1, default: true, animated: false, darkMode: true, colors: ['#000'] },
	{ id: 2, default: true, animated: false, darkMode: false, colors: ['#FFF'] },
	{ id: 3, default: true, animated: false, darkMode: true, colors: ['red'] }
];
