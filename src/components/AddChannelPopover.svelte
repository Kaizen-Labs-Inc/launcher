<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';
	import tippy, { Instance } from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/themes/translucent.css';

	import { PlusIcon } from 'svelte-feather-icons';
	import Popover from 'svelte-popover';
	import type Channel from 'src/model/Channel';
	import { v4 as uuidv4 } from 'uuid';
	import ChannelForm from './ChannelForm.svelte';
	import { mockChannels } from '../model/Channel';
	export let channels = [];
	export let editModeEnabled: boolean;
	let tippyInstance: Instance;

	let selectedChannelIndex: number = 0;
	const dispatch = createEventDispatcher();
	let query = '';

	$: {
		if (tippyInstance) {
			if (editModeEnabled || popOverIsFocused) {
				tippyInstance.disable();
			} else {
				tippyInstance.enable();
			}
		}
	}

	$: filteredChannels = mockChannels
		.filter(
			// TODO also filter by description, tags, and URL
			(channel) => channel.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
		)
		// HACK dedupe - should do this by ID or just pull directly from airtable cache
		.filter((c, i, a) => a.findIndex((t) => t.name === c.name) === i);

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
	overlayColor="rgba(0, 0, 0, 0.0)"
	zIndex="100"
>
	<button
		slot="target"
		id="addTarget"
		class="transition duration-200 ease-in-out {popOverIsFocused
			? 'rotate-45'
			: ''} {editModeEnabled
			? 'cursor-default'
			: 'cursor-pointer hover:opacity-100 hover:scale-110'}"
		><PlusIcon size="48" strokeWidth="1" /></button
	>

	<div
		transition:scale={{ duration: 200, opacity: 0, start: 0.9 }}
		slot="content"
		id="addModal"
		style="width: 340px;"
		class="bg-black backdrop-blur-2xl bg-opacity-5 p-4 shadow-xl rounded-xl mr-2"
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
						on:input={() => {
							if (isEmptyOrSpaces(query)) {
								selectedChannelIndex = 0;
							}
						}}
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
									if (!channels.map((c) => c.id).includes(channel.id)) {
										handleAdd(channel);
									}
								}}
								class="my-1 rounded-lg p-2 flex items-center {channels
									.map((c) => c.id)
									.includes(channel.id)
									? 'opacity-60'
									: selectedChannelIndex === i
									? 'bg-opacity-10 bg-white selected cursor-pointer'
									: 'cursor-pointer'}"
							>
								<div
									class="w-10 h-10 bg-white text-lg text-black rounded-md flex items-center justify-center mr-4"
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
									{#if channels.map((c) => c.id).includes(channel.id)}
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
			{:else}
				<ChannelForm
					channel={{
						name: query.charAt(0).toUpperCase() + query.substr(1).toLowerCase() || undefined
					}}
					on:submit={(event) => {
						console.log(event);
						handleAdd(event.detail.channel);
					}}
				/>
			{/if}
		</form>
	</div>
</Popover>

<style>
	/* Firefox doesn't support background blur filter yet */
	@supports (-moz-appearance: none) {
		#addModal {
			background-color: rgba(0, 0, 0, 0.95);
		}
	}
</style>
