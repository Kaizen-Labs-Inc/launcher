import type Channel from './Channel';

export default interface BoardChannel {
	id?: string;
	position: number;
	channel: Channel
}
