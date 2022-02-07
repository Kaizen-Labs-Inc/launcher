export interface Backdrop {
	id: number;
	animated: boolean;
	amplitude?: number;
	frequency?: number;
	darkMode: boolean;
	colors: BackdropColor[];
}

export interface BackdropColor {
	id?: number;
	value: string;
}

export const backdropOptions: Backdrop[] = [
	{ id: 2, animated: false, darkMode: false, colors: [{value: '#FFF'}] },
	{ id: 10, animated: false, darkMode: false, colors: [{value: '#EEEBE0'}] },
	{ id: 11, animated: false, darkMode: false, colors: [{value: '#E7E7E7'}] },
	{ id: 9, animated: false, darkMode: false, colors: [{value: '#FFD7EC'}] },
	{ id: 7, animated: false, darkMode: false, colors: [{value: '#C3E0E9'}] },
	{ id: 8, animated: false, darkMode: false, colors: [{value: '#FFCFBB'}] },
	{ id: 6, animated: false, darkMode: false, colors: [{value: '#D4E9'}] },
	{ id: 15, animated: false, darkMode: true, colors: [{value: '#28698E'}] },
	{ id: 13, animated: false, darkMode: true, colors: [{value: '#283E8E'}] },
	{ id: 3, animated: false, darkMode: true, colors: [{value: '#121640'}] },
	{ id: 4, animated: false, darkMode: true, colors: [{value: '#18320F'}] },
	{ id: 5, animated: false, darkMode: true, colors: [{value: '#6C1B16'}] },
	{ id: 1, animated: false, darkMode: true, colors: [{value: '#000'}] },
	{
		id: 12,
		animated: false,
		darkMode: true,
		colors: [{value: '#283273'}, {value: '#00FD59'}, {value: '#6C67FF'}, {value: '#1034FF'}]
	},
	{
		id: 16,
		animated: false,
		darkMode: false,
		colors: [{value: '#B7DBF9'}, {value: '#AA4CD9'}, {value: '#FFF9BF'}, {value: '#F8A097'}]
	},
	{
		id: 14,
		animated: false,
		darkMode: false,
		colors: [{value: '#CCFFB8'}, {value: '#AEFFDE'}, {value: '#FF99C0'}, {value: '#FFFCA8'}]
	}
];
