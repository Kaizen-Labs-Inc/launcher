export default interface Toast {
	id?: string;
	type?: string; // 'info', 'success', 'error'
	message?: string;
	dismissible?: boolean;
	timeout?: number; // milliseconds
}
