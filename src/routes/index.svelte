<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';

	import { dndzone } from 'svelte-dnd-action';
	import AddFormPopover from '../components/AddFormPopover.svelte';
	import AppSearchDropdown from '../components/AppSearchDropdown.svelte';
	import Channel, { mockChannels } from '../models/Channel';
	import { SearchIcon, TrashIcon, Trash2Icon } from 'svelte-feather-icons';

	let query = '';
	let searchIsFocused: boolean = false;
	let addFormIsFocused: boolean = false;
	let selectedChannelIndex;
	let channels = mockChannels;
	const flipDurationMs = 200;
	let isConsidering = false;
	let hoveredOverTrashIcon = false;
	$: filteredChannels = channels.filter(
		// TODO also filter by description, tags, and URL
		(channel) => channel.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
	);
	const handleDndConsider = (e) => {
		isConsidering = true;
		hoveredOverTrashIcon = false;
		channels = e.detail.items;
		// TODO remove mouseover hover effect of all channels
		// TODO wireup trash drop
	};
	const handleDndFinalize = (e) => {
		isConsidering = false;
		hoveredOverTrashIcon = false;
		channels = e.detail.items;
	};

	const handleProceed = (channel: Channel) => {
		window.open('https://' + channel.url, '_blank').focus();
	};
	const handleBlur = () => {
		let searchInput = document.getElementById('searchInput');
		searchIsFocused = false;
		searchInput.blur();
		selectedChannelIndex = null;
		query = '';
	};
	const handleFocus = () => {
		searchIsFocused = true;
		selectedChannelIndex = 0;
	};
	const handleInput = () => {
		selectedChannelIndex = 0;
	};
	const handleChannelAdded = (channel) => {
		channels.unshift(channel);
		channels = channels;
	};
	const toggleAddForm = () => {
		// This prevents the popover from appearing in a strange place
		setTimeout(function () {
			addFormIsFocused = !addFormIsFocused;
		}, 200);
	};
	onMount(() => {
		document.addEventListener(
			'keydown',
			(event) => {
				let searchInput = document.getElementById('searchInput');
				// Used for keeping the selected element in the dropdown in view
				let selectedHtmlEl = document.getElementsByClassName('selected')[0];

				if (
					searchIsFocused &&
					event.key === 'ArrowDown' &&
					selectedChannelIndex <= filteredChannels.length - 2
				) {
					selectedHtmlEl.scrollIntoView({
						behavior: 'smooth'
					});
					selectedChannelIndex = selectedChannelIndex + 1;
				}
				if (searchIsFocused && event.key === 'ArrowUp' && selectedChannelIndex > 0) {
					selectedHtmlEl.scrollIntoView({
						behavior: 'smooth'
					});

					selectedChannelIndex = selectedChannelIndex - 1;
				}
				if (searchIsFocused && event.key === 'Escape') {
					handleBlur();
				}
				if (searchIsFocused && event.key === 'Enter') {
					handleProceed(filteredChannels[selectedChannelIndex]);
				}
				if (
					event.metaKey &&
					event.key === 'k' &&
					searchInput !== document.activeElement &&
					!searchIsFocused
				) {
					searchIsFocused = true;
					searchInput.focus();
				}
			},
			false
		);
	});
</script>

<svelte:head>
	<title>Springboard</title>
</svelte:head>
<div class="container mx-auto pb-12">
	{#if isConsidering}
		<div class="z-50" />
		<div
			on:focus
			on:blur
			transition:scale={{ duration: 200, opacity: 0, start: 0.9 }}
			on:mouseover={() => {
				console.log('hoverin');
				hoveredOverTrashIcon = true;
			}}
			on:mouseout={() => {
				console.log('not hovering');
				hoveredOverTrashIcon = false;
			}}
			class="absolute z-40 icon-trash bg-white bg-opacity-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-10 cursor-pointer flex items-center justify-center"
		>
			{#if hoveredOverTrashIcon}
				<Trash2Icon size="48" strokeWidth="1" />
			{:else}
				<TrashIcon size="48" strokeWidth="1" />
			{/if}
		</div>
	{/if}

	<section class="mt-16 flex justify-between items-center w-full">
		<div
			class="flex flex-row p-4 rounded-t-lg w-full {searchIsFocused
				? 'bg-white bg-opacity-10'
				: ''}"
		>
			<div class="flex-shrink-0">
				<SearchIcon size="48" strokeWidth="1" />
			</div>
			<div class="flex flex-row items-center justify-between w-full">
				<input
					bind:value={query}
					on:focus={handleFocus}
					on:blur={handleBlur}
					on:input={handleInput}
					autocomplete="false"
					id="searchInput"
					placeholder="Search"
					class="ml-4 text-5xl w-2/3 border-0 outline-none bg-transparent text-white font-light"
				/>
				{#if !searchIsFocused}
					<span
						class="absolute ml-48 border-2 border-white border-opacity-50 w-10 h-10 opacity-50 flex items-center justify-center rounded-md"
						>⌘K</span
					>

					<AddFormPopover
						channels={mockChannels}
						bind:popOverIsFocused={addFormIsFocused}
						on:channelAdded={(e) => {
							handleChannelAdded(e.detail.channel);
						}}
					/>
				{/if}
			</div>
		</div>
	</section>
	{#if !searchIsFocused}
		<section
			class="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-8 md:gap-12 lg:gap-16 mt-16"
			use:dndzone={{
				items: channels,
				flipDurationMs,

				dropTargetClasses: ['target'],
				dropTargetStyle: { outline: 'none' }
			}}
			on:consider={handleDndConsider}
			on:finalize={handleDndFinalize}
		>
			{#each channels as channel, i (channel.id)}
				<div
					animate:flip={{ duration: flipDurationMs }}
					on:focus
					on:blur
					on:mouseover={() => {
						selectedChannelIndex = i;
					}}
					on:mouseout={() => {
						selectedChannelIndex = null;
					}}
					on:click={() => {
						handleProceed(channel);
					}}
					class="channel cursor-pointer flex items-center justify-between flex-col text-center transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
				>
					<div class="text-6xl mb-4 icon flex items-center justify-center">
						{#if channel.iconImageUrl}
							<img
								alt={channel.title}
								class="transition w-16 h-16 duration-300 ease-in-out {selectedChannelIndex === i
									? ' rotate-3 scale-110'
									: ''}"
								src={channel.iconImageUrl}
							/>
						{:else if channel.emoji}
							<div
								class=" transition w-16 h-16 duration-300 ease-in-out {selectedChannelIndex === i
									? ' rotate-3 scale-110'
									: ''}"
							>
								{channel.emoji}
							</div>
						{:else}
							<div
								class="text-black font-light transition w-16 h-16 duration-300 ease-in-out {selectedChannelIndex ===
								i
									? ' rotate-3 scale-110'
									: ''}"
							>
								{channel.title.charAt(0)}
							</div>
						{/if}
					</div>
					<div class="text-2xl">{channel.title}</div>
					<div class="text-md opacity-30">{channel.url}</div>
				</div>
			{/each}
		</section>
	{:else}
		<AppSearchDropdown
			bind:selectedChannelIndex
			bind:filteredChannels
			on:appSelected={(event) => {
				handleProceed(event.detail.channel);
			}}
			on:editClicked={(event) => {
				console.log('edit clicked', event.detail.channel);
			}}
			on:addClicked={toggleAddForm}
		/>
	{/if}
</div>

<style>
	.icon {
		width: 120px;
		height: 120px;
		background: linear-gradient(25.13deg, #dbdbdb 15.69%, #ffffff 93.91%);
		border-radius: 40px;
	}

	.icon-trash {
		width: 120px;
		height: 120px;

		border-radius: 40px;
	}
	/* This will remove the blue outline on drag */
	:focus {
		outline: 0 !important;
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
	}
</style>
