import type Tag from './Tag';

export default interface Channel {
	id?: string;
	name: string;
	url?: string;
	description?: string;
	icon?: string;
	emoji?: string;
	image?: string;
	tags?: Tag[];
}
