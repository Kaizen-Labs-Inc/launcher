<script lang="ts">
	import type Channel from 'src/models/Channel';

	import { Edit2Icon } from 'svelte-feather-icons';

	export let selectedChannelIndex;
	export let filteredChannels;
	// change this to a message
	// export const onSelect = (channel) => void;
</script>

<section
	style="max-height: 500px"
	class="flex flex-col w-full bg-white bg-opacity-10 rounded-b-lg overflow-y-scroll overflow-x-visible"
>
	<!-- TODO Have 2 states. A) by last used, when b) alpha  -->
	{#each filteredChannels.sort((a, b) => a.title.localeCompare(b.title)) as channel, i}
		<div
			on:click|preventDefault={() => {
				// TODO this click is getting intercepted somehow
				onSelect(channel);
			}}
			on:mouseover={() => {
				selectedChannelIndex = i;
			}}
			on:focus
			class="grid grid-cols-4 gap-12 text-left rounded-2xl cursor-pointer p-6 transition duration-200 ease-in-out  {selectedChannelIndex ===
			i
				? 'bg-white bg-opacity-10 backdrop-blur-md scale-105'
				: 'bg-transparent'}
            "
		>
			<div class="flex flex-row">
				<div class="icon flex-shrink-0 w-14 h-14 flex items-center justify-center mr-4">
					<img class="w-8 h-8" src={channel.iconImageUrl} alt={channel.title} />
				</div>
				<div class="text-2xl">
					{channel.title}
					<div class="block text-sm {selectedChannelIndex === i ? 'opacity-50' : 'opacity-25'}">
						{channel.url}
					</div>
				</div>
			</div>
			{#if channel.description}
				<div class={selectedChannelIndex === i ? 'opacity-50' : 'opacity-25'}>
					{channel.description}
				</div>
			{:else}
				<div />
			{/if}
			{#if channel.tags}
				<div class="flex flex-wrap flex-row">
					{#each channel.tags as tag}
						<div
							class="flex justify-center items-center h-8 mr-2 mb-2 text-sm font-medium rounded bg-white bg-opacity-5 px-2 py-1"
						>
							#{tag}
						</div>
					{/each}
				</div>
			{:else}
				<div />
			{/if}
			<div
				on:click|preventDefault={() => {
					console.log('edit clicked');
				}}
				class="w-12 h-12 hover:bg-white hover:bg-opacity-10 rounded-md flex justify-center items-center"
			>
				<Edit2Icon size="20" strokeWidth="1" />
			</div>
		</div>
	{/each}
</section>

<style>
	.icon {
		background: linear-gradient(25.13deg, #dbdbdb 15.69%, #fcfcfc 93.91%);
		border-radius: 20px;
	}
</style>
