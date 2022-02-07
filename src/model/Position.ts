import type Channel from './Channel';

export default interface Position {
	id?: number;
	position: number;
	channel: Channel
}
