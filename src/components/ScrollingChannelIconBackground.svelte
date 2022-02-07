<script lang="ts">
	import { mockChannels } from '../model/MockChannel';
	const channelRowLength = Math.floor(mockChannels.length / 3);
	const channelsRow1 = mockChannels.slice(0, channelRowLength);
	const channelsRow2 = mockChannels.slice(channelRowLength, channelRowLength * 2);
	const channelsRow3 = mockChannels.slice(channelRowLength * 2, channelRowLength * 3);
</script>

<div class="z-0 absolute opacity-50">
	<div class="flex flex-row flex-nowrap opacity-60 channels1 absolute">
		{#each channelsRow1 as channel}
			<div
				class="rounded-xl bg-black bg-opacity-25 flex items-center justify-center w-20 h-20 shadow m-6 flex-shrink-0"
			>
				<img src={channel.iconImageUrl} class="w-10 h-10" alt={channel.description} />
			</div>
		{/each}
	</div>
	<div class="flex flex-row flex-nowrap opacity-60 channels2 absolute">
		{#each channelsRow1 as channel}
			<div
				class="rounded-xl bg-black bg-opacity-25 flex items-center justify-center w-20 h-20 shadow m-6 flex-shrink-0"
			>
				<img src={channel.iconImageUrl} class="w-10 h-10" alt={channel.description} />
			</div>
		{/each}
	</div>
	<div class="flex flex-row flex-nowrap opacity-60 channels3 absolute top-32">
		{#each channelsRow2 as channel}
			<div
				class="rounded-xl bg-black bg-opacity-25 flex items-center justify-center w-20 h-20 shadow m-6 flex-shrink-0"
			>
				<img src={channel.iconImageUrl} class="w-10 h-10" alt={channel.description} />
			</div>
		{/each}
	</div>
	<div class="flex flex-row flex-nowrap opacity-60 channels4 absolute top-32">
		{#each channelsRow2 as channel}
			<div
				class="rounded-xl bg-black bg-opacity-25 flex items-center justify-center w-20 h-20 shadow m-6 flex-shrink-0"
			>
				<img src={channel.iconImageUrl} class="w-10 h-10" alt={channel.description} />
			</div>
		{/each}
	</div>
	<div class="flex flex-row flex-nowrap opacity-60 channels1 absolute top-64">
		{#each channelsRow3 as channel}
			<div
				class="rounded-xl bg-black bg-opacity-25 flex items-center justify-center w-20 h-20 shadow m-6 flex-shrink-0"
			>
				<img src={channel.iconImageUrl} class="w-10 h-10" alt={channel.description} />
			</div>
		{/each}
	</div>
	<div class="flex flex-row flex-nowrap opacity-60 channels2 absolute top-64">
		{#each channelsRow3 as channel}
			<div
				class="rounded-xl bg-black bg-opacity-25 flex items-center justify-center w-20 h-20 shadow m-6 flex-shrink-0"
			>
				<img src={channel.iconImageUrl} class="w-10 h-10" alt={channel.description} />
			</div>
		{/each}
	</div>
</div>

<style>
	.channels1 {
		animation: channelMarquee 15s linear infinite;
	}
	.channels2 {
		left: 1025px;
		animation: channelMarquee 15s linear infinite;
	}

	.channels3 {
		animation: channelMarqueeB 15s linear infinite;
	}
	.channels4 {
		left: -1025px;
		animation: channelMarqueeB 15s linear infinite;
	}

	@keyframes channelMarquee {
		0% {
			transform: translate(0%, 0);
		}
		100% {
			transform: translate(-100%, 0);
		}
	}

	@keyframes channelMarqueeB {
		0% {
			transform: translate(0%, 0);
		}
		100% {
			transform: translate(100%, 0);
		}
	}
</style>
