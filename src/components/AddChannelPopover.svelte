<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';

	import { PlusIcon } from 'svelte-feather-icons';
	import type MockChannel from 'src/model/MockChannel';
	import type Channel from '../model/Channel';
	import filterChannelsByQuery from '../lib/filterChannelsByQuery';
	import { isEmptyOrSpaces } from '../utils/isEmptyOrSpaces';
	import { clickOutside } from '../utils/DetectClickOutsideOfElement';
	import ChannelForm from './ChannelForm.svelte';
	import Button from './Button.svelte';
	import type { Backdrop } from '../model/Backdrop';
	export let channels: Channel[] = [];
	export let board;
	export let editModeEnabled: boolean;
	export let selectedBackdrop: Backdrop;
	export let stepOneComplete: boolean = false;
	let searchQuery: string = '';
	let selectedChannelIndex: number = 0;
	let stepTwoComplete: boolean = false;
	let channelUrl: string = '';
	let channelMetadataLoading: boolean = false;
	let channel: Channel;
	let channelDescription: string = '';
	const dispatch = createEventDispatcher();

	$: filteredChannels = channels.filter((channel) =>
		filterChannelsByQuery(channel, searchQuery.toLowerCase())
	);

	$: boardChannelIds = board?.positions?.map((p) => p.channel.id) || [];

	$: channel = {
		description: channelDescription,
		url: channelUrl
	};
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
		resetPopover();
	};

	const handleContinue = () => {
		if (!stepOneComplete && !stepTwoComplete) {
			stepOneComplete = true;
			selectedChannelIndex = null;
			analytics.track('Channel added step one completed');
		} else if (stepOneComplete && !stepTwoComplete) {
			handleUrlSubmission();

			analytics.track('Channel added step two completed');
		}
	};

	const resetPopover = () => {
		popOverIsFocused = false;
		stepOneComplete = false;
		stepTwoComplete = false;
		selectedChannelIndex = null;
		searchQuery = '';
		channelUrl = '';
	};

	const clickOutsideFilter = (node: Node) => {
		const emojiPicker = document.getElementsByClassName('emoji-picker__wrapper');
		const addTarget = document.getElementById('addTarget');
		if (addTarget.contains(node)) return true;
		if (emojiPicker.length > 0 && emojiPicker[0].contains(node)) return true;
	};

	const handleUrlSubmission = () => {
		channelMetadataLoading = true;
		let metaData;
		const encodedUrl = encodeURIComponent(channelUrl);
		return fetch(`/api/scrape?url=${encodedUrl}`)
			.then(async (res: Response) => {
				// TO DO store image on our side?
				// TO DO check for and prevent duplicates
				// Probably from URL or some fragment of the URL
				res
					.json()
					.then((data: any) => {
						metaData = data;
						channel.description = metaData.description ?? '';
						analytics.track('URL scraped', { url: channelUrl });
					})
					.then(() => {
						const encodedImageUrl = encodeURIComponent(metaData.icon);
						fetch(`/api/checkImage?url=${encodedImageUrl}`)
							.then(async (res: Response) => {
								res.json().then((res) => {
									if (res.status === 200) {
										channel.image = metaData.icon;
									} else {
										channel.image = undefined;
									}
								});
								channelMetadataLoading = false;
								stepTwoComplete = true;
								handleContinue();
							})
							.catch((e) => console.error(e));
					});
			})
			.catch((e: Error) => {
				channel.name = '';
				channel.description = '';
				channel.image = undefined;
				channelMetadataLoading = false;
				stepTwoComplete = true;
				handleContinue();
				analytics.track('URL scraping failed', { url: channelUrl, error: e.message });
			});
	};
</script>

<button
	on:click={() => {
		togglePopover();
		dispatch('hoverOut');
	}}
	on:mouseover={() => {
		if (!popOverIsFocused) {
			dispatch('hoverOverEditIcon');
		} else {
			dispatch('hoverOverCloseIcon');
		}
	}}
	on:mouseout={() => {
		dispatch('hoverOut');
	}}
	id="addTarget"
	tabindex="0"
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
								? `bg-opacity-10 ${
										selectedBackdrop.darkMode ? 'bg-white' : 'bg-black'
								  } selected cursor-pointer`
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
						? `bg-opacity-10 ${selectedBackdrop.darkMode ? 'bg-white' : 'bg-black'}  selected`
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
			<form>
				<div class="flex flex-col items-start">
					<label for="url" class="font-medium mb-1">URL</label>
					<input
						bind:value={channelUrl}
						autofocus
						name="url"
						type="url"
						placeholder="Paste the link here"
						class="bg-white bg-opacity-10 rounded p-2 w-full"
					/>
				</div>

				<Button label="Next" loading={channelMetadataLoading} on:clicked={handleContinue} />
			</form>
		{:else}
			<ChannelForm
				channel={channel}
				on:submit={(event) => {
					handleAdd(event.detail.channel);
				}}
				bind:selectedBackdrop
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
