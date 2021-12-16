<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SearchDropdownChannelActions from './SearchDropdownChannelActions.svelte';
	export let selectedChannelIndex;
	export let filteredChannels;
	export let positions;
	let channelIds: number[];
	channelIds = positions.map((p) => p.channel.id);

	const dispatch = createEventDispatcher();

	const onSelect = (channel) => {
		dispatch('appSelected', {
			channel: channel
		});
	};

	const onEdit = (channel) => {
		dispatch('editClicked', {
			channel: channel
		});
	};

	const onAdd = (channel) => {
		dispatch('addClicked', {
			channel: channel
		});
	};

	const onNewChannel = () => {
		dispatch('newChannelClicked');
	};
</script>

<section
	style="max-height: 500px; scroll-behavior: smooth;"
	id="appDropdown"
	class="flex flex-col w-full bg-white bg-opacity-10 backdrop-blur-2xl rounded-b-lg overflow-y-scroll shadow-2xl"
>
	<!-- TODO Have 2 states. A) by last used, when b) alpha  -->
	{#if filteredChannels.length === 0}
		<div class="mt-16 mb-16 flex flex-col justify-center items-center">
			<p class="text-2xl ">🤷‍♂️ Nothing found.</p>
			<div
				on:click={onNewChannel}
				class="bg-white bg-opacity-20 cursor-pointer text-lg font-medium mt-8 p-3 rounded"
			>
				Add something
			</div>
		</div>
	{:else}
		{#each filteredChannels.sort((a, b) => a.name.localeCompare(b.name)) as channel, i}
			<div
				class="flex justify-between p-6 transition duration-200 ease-in-out {filteredChannels.length ===
				1
					? 'rounded-b-lg'
					: ''}  {selectedChannelIndex === i
					? 'bg-white bg-opacity-10 backdrop-blur-md selected'
					: 'bg-transparent'}
            "
			>
				<div
					class="w-full grid grid-cols-4 gap-16 items-center text-left cursor-pointer"
					on:mousedown|preventDefault={(e) => {
						if (e.target.parentElement.id !== 'addChannelButton') {
							onSelect(channel);
						}
					}}
					on:mouseover={() => {
						selectedChannelIndex = i;
					}}
					on:focus
				>
					<div class="flex flex-row items-center">
						<div
							class="icon sm:rounded-2xl rounded-lg flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center mr-2 sm:mr-4"
						>
							{#if channel.image}
								<img class="sm:w-8 sm:h-8 w-5 h-5" src={channel.image} alt={channel.name} />
							{:else if channel.emoji}
								<div class="text-lg sm:text-2xl">
									{channel.emoji}
								</div>
							{:else}
								<div class="text-black text-lg sm:text-2xl">
									{channel.name.charAt(0)}
								</div>
							{/if}
						</div>
						<div class="sm:text-2xl ">
							{channel.name}
							<div class="block text-sm {selectedChannelIndex === i ? 'opacity-50' : 'opacity-25'}">
								{channel.url}
							</div>
						</div>
					</div>
					{#if channel.description}
						<div
							class="text-sm sm:text-base {selectedChannelIndex === i
								? 'opacity-60'
								: 'opacity-30'}"
						>
							{channel.description}
						</div>
					{:else}
						<div />
					{/if}
					{#if channel.tags}
						<div class="sm:flex flex-wrap flex-row">
							{#each channel.tags as tag}
								<div
									class="flex justify-center items-center h-8 m-1 p-2 text-xs sm:text-sm font-medium  rounded bg-white bg-opacity-5"
								>
									#{tag.name}
								</div>
							{/each}
						</div>
					{:else}
						<div />
					{/if}
				</div>
				<SearchDropdownChannelActions
					channel={channel}
					channelIds={channelIds}
					on:editClicked={(event) => {
						onEdit(event.detail.channel);
					}}
					on:addClicked={(event) => {
						onAdd(event.detail.channel);
					}}
				/>
			</div>
		{/each}
	{/if}
</section>

<style>
	.icon {
		background: linear-gradient(25.13deg, #dbdbdb 15.69%, #fcfcfc 93.91%);
	}
</style>
