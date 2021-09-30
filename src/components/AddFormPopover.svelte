<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';

	import { scale } from 'svelte/transition';
	import { PlusCircleIcon, PlusIcon } from 'svelte-feather-icons';
	import Popover from 'svelte-popover';
	import Tags from 'svelte-tags-input';
	import type Channel from 'src/models/Channel';
	import { v4 as uuidv4 } from 'uuid';

	export let channels = [];
	let selectedChannelIndex: number = 0;
	const dispatch = createEventDispatcher();
	let query = '';
	$: filteredChannels = channels
		.filter(
			// TODO also filter by description, tags, and URL
			(channel) => channel.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
		)
		// HACK dedupe - should do this by ID or just pull directly from airtable cache
		.filter((c, i, a) => a.findIndex((t) => t.title === c.title) === i);
	let newChannel: Channel = {
		title: '',
		description: '',
		url: '',
		icon: '',
		tags: []
	};
	export let popOverIsFocused: boolean = false;
	let stepOneComplete: boolean = false;
	const resetPopover = () => {
		popOverIsFocused = false;
		selectedChannelIndex = null;
		query = '';
		stepOneComplete = false;
	};
	const isEmptyOrSpaces = (str) => {
		return str === null || str.match(/^ *$/) !== null;
	};
	onMount(() => {
		document.addEventListener(
			'keydown',
			(event) => {
				if (popOverIsFocused && event.key === 'Escape') {
					resetPopover();
				}
				if (
					popOverIsFocused &&
					event.key === 'ArrowDown' &&
					selectedChannelIndex <= filteredChannels.length
				) {
					if (selectedChannelIndex <= filteredChannels.length - 2) {
						selectedChannelIndex = selectedChannelIndex + 1;
					} else {
						selectedChannelIndex = filteredChannels.length + 1;
					}
				}

				if (popOverIsFocused && event.key === 'ArrowUp' && selectedChannelIndex >= 1) {
					selectedChannelIndex = selectedChannelIndex - 1;
				}

				if (popOverIsFocused && event.key === 'Enter') {
					if (selectedChannelIndex < filteredChannels.length) {
						resetPopover();
						handleAdd(filteredChannels[selectedChannelIndex]);
					} else {
						handleContinue();
					}
				}
			},
			false
		);
	});

	const handleTags = (event: any) => {
		newChannel.tags = event.detail.tags;
	};
	const handleAdd = (channel: Channel) => {
		// Generate a new UUID
		channel.id = uuidv4();
		// Pass this channel back to the parent as an event
		dispatch('channelAdded', {
			channel: channel
		});
		resetPopover();
	};
	const handleContinue = () => {
		stepOneComplete = true;
		selectedChannelIndex = null;
		addNewChannelSelected = false;
	};
</script>

<Popover
	arrow={false}
	placement="left-start"
	open={popOverIsFocused}
	on:open={() => {
		popOverIsFocused = true;
	}}
	on:close={resetPopover}
>
	<button
		slot="target"
		class="cursor-pointer transition duration-200 ease-in-out {popOverIsFocused
			? 'rotate-45'
			: 'hover:scale-110 hover:opacity-100 opacity-75'}"
		><PlusCircleIcon size="48" strokeWidth="1" /></button
	>
	<!-- TODO add icon/image upload -->
	<div
		transition:scale={{ duration: 200, opacity: 0, start: 0.9 }}
		slot="content"
		style="width: 340px;"
		class="bg-white backdrop-blur-lg bg-opacity-10 p-6 shadow-xl rounded-xl mr-2"
	>
		<form>
			{#if !stepOneComplete}
				<div class="flex flex-col">
					<input
						bind:value={query}
						name="url"
						autofocus
						type="url"
						id="url"
						placeholder="Search for an app"
						class="bg-white bg-opacity-10 rounded p-2 outline-none"
					/>
				</div>
				{#if !isEmptyOrSpaces(query)}
					<ul class="mt-4">
						{#each filteredChannels as channel, i}
							<li
								on:focus
								on:mouseover={() => {
									selectedChannelIndex = i;
								}}
								on:click={() => {
									handleAdd(channel);
								}}
								class="my-1 rounded-lg cursor-pointer p-2 flex items-center {selectedChannelIndex ===
								i
									? 'bg-opacity-10 bg-white selected'
									: ''}"
							>
								<div class="w-10 h-10 bg-white rounded-md flex items-center justify-center mr-4">
									<img src={channel.iconImageUrl} class="w-6 h-6" alt={channel.title} />
								</div>
								<div>
									{channel.title} - {i} - {selectedChannelIndex} - {filteredChannels.length}
								</div>
							</li>
						{/each}
					</ul>
					{#if filteredChannels.length === 0}
						<div class="w-full mx-auto text-center opacity-50 text-sm mb-4">
							We couldn't find anything.
						</div>
					{/if}
					<div
						on:focus
						on:blur
						on:mouseover={() => {
							selectedChannelIndex = filteredChannels.length;
						}}
						on:click={handleContinue}
						class="my-1 {selectedChannelIndex === filteredChannels.length
							? 'bg-opacity-10 bg-white selected'
							: ''} rounded-lg cursor-pointer p-2 flex items-center "
					>
						<div
							class="w-10 h-10 bg-white rounded-md flex items-center justify-center mr-4 text-black"
						>
							<PlusIcon strokeWidth="2" size="20" />
						</div>
						<div>Add a new app</div>
					</div>
				{/if}
			{:else}
				<div class="flex flex-row items-end justify-between mb-4 ">
					<div class=" flex flex-col">
						<label for="title" class="font-medium text-gray-500">Name it</label>
						<input
							autofocus
							bind:value={newChannel.title}
							name="title"
							type="text"
							placeholder="Type a name"
							class="bg-gray-200 rounded p-2"
						/>
					</div>
					<div
						class="cursor-pointer rounded-lg w-14 h-14 bg-gray-300 transition duration-200 ease-in-out hover:scale-105"
					>
						<!-- Add icon or emoji here -->
					</div>
				</div>
				<div class="my-4 flex flex-col">
					<label for="description" class="font-medium text-gray-500">Describe it</label>
					<textarea
						bind:value={newChannel.description}
						name="description"
						type="text"
						placeholder="Add an optional description"
						class="bg-gray-200 rounded p-2"
					/>
				</div>
				<div class="my-4 flex flex-col">
					<label for="tags" class="font-medium text-gray-500">Tag it</label>
					<div class="tagsContainer">
						<Tags
							on:tags={(e) => {
								handleTags(e);
							}}
							onlyUnique
							placeholder="Add tags"
						/>
					</div>
				</div>
				<div
					on:click={() => {
						handleAdd(newChannel);
					}}
					class="flex mt-2 cursor-pointer justify-center items-center rounded bg-black text-white font-medium py-2 text-lg"
				>
					Add it
				</div>
			{/if}
		</form>
	</div>
</Popover>

<style>
	.tagsContainer :global(.svelte-tags-input) {
		background: transparent;
		padding-top: 4px;
		padding-bottom: 4px;
		font-size: 16px;
	}
	.tagsContainer :global(.svelte-tags-input-tag) {
		border-radius: 3px;
		background: rgba(0, 0, 0, 0.8);
		font-size: 16px;
		padding: 4px;
	}

	.tagsContainer :global(.svelte-tags-input-tag-remove) {
		margin-left: 5px;
	}
	.tagsContainer :global(.svelte-tags-input-layout) {
		background-color: #e5e7eb;
		border: none;
		outline: none;
	}

	.tagsContainer :global(.svelte-tags-input-layout:focus) {
		border: none;
	}
	.tagsContainer :global(.svelte-tags-input-layout:hover) {
		border: none;
	}
</style>
