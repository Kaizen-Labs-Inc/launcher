import type Channel from '../model/Channel';

export default function filterChannelsByQuery(channel: Channel, lowercaseQuery: string): boolean {
	const foundInName = channel.name.toLowerCase().indexOf(lowercaseQuery) !== -1
	const foundInDescription = (channel.description?.toLowerCase() || "").indexOf(lowercaseQuery) !== -1
	const foundInTags = !!channel.tags.find(it => it.name.toLowerCase().indexOf(lowercaseQuery) !== -1)
	return foundInName || foundInDescription || foundInTags
}
