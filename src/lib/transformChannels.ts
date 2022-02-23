
export default function transformChannels(channels: any, user: any) {
	channels.forEach(it => { if (it.userId === user?.id) { it.createdByUser = true }})
}
