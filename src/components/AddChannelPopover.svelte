<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';

	import tippy, { Instance } from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/themes/translucent.css';
	import { PlusIcon } from 'svelte-feather-icons';
	import type MockChannel from 'src/model/MockChannel';
	import type Channel from '../model/Channel';
	import filterChannelsByQuery from '../lib/filterChannelsByQuery';
	import { isEmptyOrSpaces } from '../utils/isEmptyOrSpaces';

	import { clickOutside } from '../utils/DetectClickOutsideOfElement';
	import ChannelForm from './ChannelForm.svelte';
	import Button from './Button.svelte';

	export let channels: Channel[] = [];
	export let board;
	export let editModeEnabled: boolean;
	let searchQuery: string = '';
	let tippyInstance: Instance;
	let selectedChannelIndex: number = 0;
	let stepOneComplete: boolean = false;
	let stepTwoComplete: boolean = false;
	let channelUrl: string = '';
	let channelMetadataLoading: boolean = false;
	const dispatch = createEventDispatcher();

	$: {
		if (tippyInstance) {
			if (editModeEnabled || popOverIsFocused) {
				tippyInstance.disable();
			} else {
				tippyInstance.enable();
			}
		}
	}

	$: filteredChannels = channels.filter((channel) =>
		filterChannelsByQuery(channel, searchQuery.toLowerCase())
	);

	$: boardChannelIds = board?.positions?.map((p) => p.channel.id) || [];

	export let popOverIsFocused: boolean = false;

	const togglePopover = () => {
		if (popOverIsFocused) {
			resetPopover();
		} else {
			popOverIsFocused = true;
		}
		analytics.track('Toggle new channel button clicked');
	};

	onMount(() => {
		tippyInstance = tippy(document.getElementById('addTarget'), {
			content: 'Add an app',
			arrow: false,
			theme: 'translucent'
		});

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
						selectedChannelIndex = filteredChannels.length;
					}
				}

				if (popOverIsFocused && event.key === 'ArrowUp' && selectedChannelIndex >= 1) {
					selectedChannelIndex = selectedChannelIndex - 1;
				}

				if (popOverIsFocused && event.key === 'Enter') {
					if (selectedChannelIndex < filteredChannels.length) {
						handleAdd(filteredChannels[selectedChannelIndex]);
					} else {
						handleContinue();
					}
				}
			},
			false
		);
	});

	const handleAdd = (channel: MockChannel) => {
		// Pass this channel back to the parent as an event
		dispatch('channelAdded', {
			channel: channel
		});
		console.log('added');
		resetPopover();
	};

	const handleContinue = () => {
		stepOneComplete = true;
		selectedChannelIndex = null;
		analytics.track('Channel added step one completed');
	};

	const resetPopover = () => {
		popOverIsFocused = false;
		stepOneComplete = false;
		selectedChannelIndex = null;
		searchQuery = '';
	};

	const clickOutsideFilter = (node: Node) => {
		console.log(node);
		const emojiPicker = document.getElementsByClassName('emoji-picker__wrapper');
		if (emojiPicker.length > 0 && emojiPicker[0].contains(node)) return true;
	};

	const handleUrlSubmission = () => {
		channelMetadataLoading = true;
		const encodedUrl = encodeURIComponent(channelUrl);
		return fetch(`/api/scrape?url=${encodedUrl}`).then((res) => {
			console.log(res);
			channelMetadataLoading = false;
			stepTwoComplete = true;
		});
	};
</script>

<button
	on:click={togglePopover}
	id={popOverIsFocused ? 'closeTarget' : 'addTarget'}
	class="transition duration-200 ease-in-out sm:w-10 sm:h-10 w-6 h-6 {popOverIsFocused
		? 'rotate-45'
		: ''} {editModeEnabled ? 'cursor-default' : 'cursor-pointer hover:opacity-100 hover:scale-110'}"
	><PlusIcon strokeWidth="1" /></button
>
{#if popOverIsFocused}
	<div
		transition:scale={{ duration: 200, opacity: 0, start: 0.9 }}
		use:clickOutside={{
			exclusionFilter: clickOutsideFilter
		}}
		on:clickOutside={resetPopover}
		id="addModal"
		style="width: 340px;"
		class="p-4 bg-white bg-opacity-10 backdrop-blur-2xl shadow-2xl rounded-xl mr-2 absolute top-2 right-16 z-50"
	>
		{#if !stepOneComplete}
			<div class="flex flex-col">
				<input
					bind:value={searchQuery}
					autofocus
					placeholder="Search for an app"
					class="bg-white bg-opacity-10 rounded p-2 outline-none"
					on:input={() => {
						if (isEmptyOrSpaces(searchQuery)) {
							selectedChannelIndex = 0;
						}
					}}
				/>
			</div>
			{#if !isEmptyOrSpaces(searchQuery)}
				<ul class="mt-4">
					{#each filteredChannels as channel, i}
						<li
							on:focus
							on:mouseover={() => {
								selectedChannelIndex = i;
							}}
							on:click={() => {
								if (!boardChannelIds.includes(channel.id)) {
									handleAdd(channel);
								}
							}}
							class="my-1 rounded-lg p-2 flex items-center {boardChannelIds.includes(channel.id)
								? 'opacity-60'
								: selectedChannelIndex === i
								? 'bg-opacity-10 bg-white selected cursor-pointer'
								: 'cursor-pointer'}"
						>
							<div
								class="w-10 h-10 flex-shrink-0 bg-white text-lg text-black rounded-md flex items-center justify-center mr-4"
							>
								{#if channel.image}
									<img src={channel.image} class="w-6 h-6" alt={channel.name} />
								{:else if channel.emoji}
									{channel.emoji}
								{:else}
									{channel.name.charAt(0)}
								{/if}
							</div>
							<div class="flex justify-between align-center w-full">
								<div>
									{channel.name}
								</div>
								<!-- TODO We need a new store for the users individual channels -->
								<!-- For now we're just using 'channels',
							a prop passed from the parent that is keeping state -->
								{#if boardChannelIds.includes(channel.id)}
									<div class="opacity-70">✓ Added</div>
								{/if}
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
						class="w-10 h-10 bg-white text-black rounded-md flex items-center justify-center mr-4"
					>
						<PlusIcon strokeWidth="2" size="20" />
					</div>
					<div>Add a new app</div>
				</div>
			{/if}
		{:else if !stepTwoComplete}
			<div class="flex flex-col">
				<label for="url" class="font-medium mb-1">URL</label>
				<input
					bind:value={channelUrl}
					autofocus
					name="url"
					type="url"
					placeholder="Paste the link here"
					class="bg-white bg-opacity-10 rounded p-2"
				/>
			</div>
			<Button label="Save" disabled={channelMetadataLoading} on:clicked={handleUrlSubmission} />
		{:else}
			<ChannelForm
				channel={{
					name:
						searchQuery.charAt(0).toUpperCase() + searchQuery.substr(1).toLowerCase() || undefined,
					url: channelUrl
				}}
				on:submit={(event) => {
					handleAdd(event.detail.channel);
				}}
			/>
		{/if}
	</div>
{/if}

<style>
	/* Firefox doesn't support background blur filter yet */
	@supports (-moz-appearance: none) {
		#addModal {
			background-color: rgba(0, 0, 0, 0.95);
		}
	}
</style>
