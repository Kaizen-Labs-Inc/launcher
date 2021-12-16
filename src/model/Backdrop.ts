export interface Backdrop {
	id: number;
	animated: boolean;
	amplitude?: number;
	frequency?: number;
	darkMode: boolean;
	colors: string[];
}
export const backdropOptions: Backdrop[] = [
	{ id: 2, animated: false, darkMode: false, colors: ['#FFF'] },
	{ id: 10, animated: false, darkMode: false, colors: ['#EEEBE0'] },
	{ id: 11, animated: false, darkMode: false, colors: ['#E7E7E7'] },
	{ id: 9, animated: false, darkMode: false, colors: ['#FFD7EC'] },
	{ id: 7, animated: false, darkMode: false, colors: ['#C3E0E9'] },
	{ id: 8, animated: false, darkMode: false, colors: ['#FFCFBB'] },
	{ id: 6, animated: false, darkMode: false, colors: ['#D4E9'] },
	{ id: 15, animated: false, darkMode: true, colors: ['#28698E'] },
	{ id: 13, animated: false, darkMode: true, colors: ['#283E8E'] },
	{ id: 3, animated: false, darkMode: true, colors: ['#121640'] },
	{ id: 4, animated: false, darkMode: true, colors: ['#18320F'] },
	{ id: 5, animated: false, darkMode: true, colors: ['#6C1B16'] },
	{ id: 1, animated: false, darkMode: true, colors: ['#000'] },
	{
		id: 12,
		animated: false,
		darkMode: true,
		colors: ['#283273', '#00FD59', '#6C67FF', '#1034FF']
	},
	{
		id: 16,
		animated: false,
		darkMode: false,
		colors: ['#B7DBF9', '#AA4CD9', '#FFF9BF', '#F8A097']
	},
	{
		id: 14,
		animated: false,
		darkMode: false,
		colors: ['#CCFFB8', '#AEFFDE', '#FF99C0', '#FFFCA8']
	}
];
