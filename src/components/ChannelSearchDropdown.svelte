<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Edit2Icon } from 'svelte-feather-icons';
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

	const onAdd = () => {
		dispatch('addClicked');
	};
</script>

<section
	style="max-height: 500px; scroll-behavior: smooth;"
	id="appDropdown"
	class="flex flex-col w-full bg-white bg-opacity-10 rounded-b-lg overflow-y-scroll shadow-2xl"
>
	<!-- TODO Have 2 states. A) by last used, when b) alpha  -->
	{#if filteredChannels.length === 0}
		<div class="mt-16 mb-16 flex flex-col justify-center items-center">
			<p class="text-2xl ">🤷‍♂️ Nothing found.</p>
			<div
				on:mousedown={onAdd}
				class="bg-white bg-opacity-20 cursor-pointer text-lg font-medium mt-8 p-3 rounded"
			>
				Add something
			</div>
		</div>
	{:else}
		{#each filteredChannels.sort((a, b) => a.name.localeCompare(b.name)) as channel, i}
			<div
				on:mousedown|preventDefault={() => {
					onSelect(channel);
				}}
				on:mouseover={() => {
					selectedChannelIndex = i;
				}}
				on:focus
				class="grid grid-cols-4 gap-12 text-left cursor-pointer p-6 transition duration-200 ease-in-out {filteredChannels.length ===
				1
					? 'rounded-b-lg'
					: ''}  {selectedChannelIndex === i
					? 'bg-white bg-opacity-10 backdrop-blur-md selected'
					: 'bg-transparent'}
            "
			>
				<div class="flex flex-row">
					<div class="icon flex-shrink-0 w-14 h-14 flex items-center justify-center mr-4">
						{#if channel.image}
							<img class="w-8 h-8" src={channel.image} alt={channel.name} />
						{:else if channel.emoji}
							<div class="text-2xl">
								{channel.emoji}
							</div>
						{:else}
							<div class="text-black text-2xl">
								{channel.name.charAt(0)}
							</div>
						{/if}
					</div>
					<div class="text-2xl">
						{channel.name}
						<div class="block text-sm {selectedChannelIndex === i ? 'opacity-50' : 'opacity-25'}">
							{channel.url}
						</div>
					</div>
				</div>
				{#if channel.description}
					<div class={selectedChannelIndex === i ? 'opacity-60' : 'opacity-30'}>
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
				<div class="w-full flex justify-end">
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
		border-radius: 20px;
	}
</style>
