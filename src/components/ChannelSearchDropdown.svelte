<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Edit2Icon, PlusIcon } from 'svelte-feather-icons';
	export let selectedChannelIndex;
	export let filteredChannels;
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
				on:mousedown={onNewChannel}
				class="bg-white bg-opacity-20 cursor-pointer text-lg font-medium mt-8 p-3 rounded"
			>
				Add something
			</div>
		</div>
	{:else}
		{#each filteredChannels.sort((a, b) => a.title.localeCompare(b.title)) as channel, i}
			<div
				on:mousedown|preventDefault={() => {
					onSelect(channel);
				}}
				on:mouseover={() => {
					selectedChannelIndex = i;
				}}
				on:focus
				class="flex flex-row items-center sm:grid sm:grid-cols-4 sm:gap-16 text-left cursor-pointer p-6 transition duration-200 ease-in-out {filteredChannels.length ===
				1
					? 'rounded-b-lg'
					: ''}  {selectedChannelIndex === i
					? 'bg-white bg-opacity-10 backdrop-blur-md selected'
					: 'bg-transparent'}
            "
			>
				<div class="flex flex-row items-center">
					<div
						class="icon sm:rounded-2xl rounded-lg flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center mr-2 sm:mr-4"
					>
						{#if channel.iconImageUrl}
							<img
								class="sm:w-8 sm:h-8 w-5 h-5"
								src={channel.iconImageUrlDark ? channel.iconImageUrlDark : channel.iconImageUrl}
								alt={channel.title}
							/>
						{:else if channel.emoji}
							<div class="text-lg sm:text-2xl">
								{channel.emoji}
							</div>
						{:else}
							<div class="text-black text-lg sm:text-2xl">
								{channel.title.charAt(0)}
							</div>
						{/if}
					</div>
					<div class="sm:text-2xl ">
						{channel.title}
						<div class="block text-sm {selectedChannelIndex === i ? 'opacity-50' : 'opacity-25'}">
							{channel.url}
						</div>
					</div>
				</div>
				{#if channel.description}
					<div
						class="hidden text-sm lg:text-lg sm:block {selectedChannelIndex === i
							? 'opacity-60'
							: 'opacity-30'}"
					>
						{channel.description}
					</div>
				{:else}
					<div />
				{/if}
				{#if channel.tags}
					<div class="hidden sm:flex flex-wrap flex-row">
						{#each channel.tags as tag}
							<div
								class="flex justify-center items-center h-8 m-1 p-2 text-xs sm:text-sm font-medium  rounded bg-white bg-opacity-5"
							>
								#{tag}
							</div>
						{/each}
					</div>
				{:else}
					<div />
				{/if}
				<div class=" w-full flex justify-end">
					<div
						on:mousedown|preventDefault={(channel) => {
							onAdd(channel);
						}}
						class="w-12 h-12 mr-3 hover:bg-white hover:bg-opacity-10 rounded-md flex justify-center items-center"
					>
						<!-- TODO if already added to homescreen, show a checkmark with no-op -->
						<PlusIcon size="20" strokeWidth="1" />
					</div>
					<div
						on:mousedown|preventDefault={(channel) => {
							onEdit(channel);
						}}
						class="w-12 h-12 hover:bg-white hover:bg-opacity-10 rounded-md flex justify-center items-center"
					>
						<Edit2Icon size="20" strokeWidth="1" />
					</div>
				</div>
			</div>
		{/each}
	{/if}
</section>

<style>
	.icon {
		background: linear-gradient(25.13deg, #dbdbdb 15.69%, #fcfcfc 93.91%);
	}
</style>
