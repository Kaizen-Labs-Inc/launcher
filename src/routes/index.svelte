<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import AddFormPopover from '../components/AddFormPopover.svelte';
	import AppSearchDropdown from '../components/AppSearchDropdown.svelte';
	import Channel, { mockChannels } from '../models/Channel';
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/themes/translucent.css';
	import { SearchIcon, GridIcon, Edit2Icon, XIcon } from 'svelte-feather-icons';

	let query = '';
	let searchIsFocused: boolean = false;
	let addFormIsFocused: boolean = false;
	let selectedChannelIndex;
	let channels = mockChannels;
	const flipDurationMs = 200;
	let isConsidering = false;
	let editModeEnabled = false;

	// For edit mode jiggles
	const jiggleAnimDelayMin = -0.75;
	const jiggleAnimDelayMax = -0.05;
	const jiggleAnimDurationMin = 0.22;
	const jiggleAnimDurationMax = 0.3;

	$: filteredChannels = channels.filter(
		// TODO also filter by description, tags, and URL
		(channel) => channel.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
	);
	const handleDndConsider = (e) => {
		isConsidering = true;
		channels = e.detail.items;
	};
	const handleDndFinalize = (e) => {
		isConsidering = false;
		channels = e.detail.items;
	};

	const handleProceed = (channel: Channel) => {
		selectedChannelIndex = null;
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
		if (!editModeEnabled) {
			searchIsFocused = true;
			selectedChannelIndex = 0;
		}
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

	const handleEditModeToggle = () => {
		editModeEnabled = !editModeEnabled;
	};

	onMount(() => {
		tippy('#editToggle', {
			content: 'Edit your Springboard',
			arrow: false,
			theme: 'translucent'
		});

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

				if (editModeEnabled && event.key === 'Escape') {
					editModeEnabled = false;
				}

				if (searchIsFocused && event.key === 'Enter') {
					handleProceed(filteredChannels[selectedChannelIndex]);
				}
				if (
					event.metaKey &&
					event.key === 'k' &&
					searchInput !== document.activeElement &&
					!searchIsFocused &&
					!editModeEnabled
				) {
					searchIsFocused = true;
					searchInput.focus();
				}
			},
			false
		);
		// Handle clicking out of edit mode
		// TODO This target detection isn't perfect, and if the user clicks on the SVG, it will set editMode to false
		document.addEventListener('click', function (e) {
			if (editModeEnabled && e.target.parentElement.id !== 'editToggle') {
				var node = e.target;
				var inside = false;
				while (node) {
					if (node.classList.contains('channel')) {
						inside = true;
						break;
					}
					node = node.parentElement;
				}
				if (!inside) {
					editModeEnabled = false;
				}
			}
		});
	});
</script>

<svelte:head>
	<title>Springboard</title>
</svelte:head>
<div class="container mx-auto pb-12">
	<section
		class="mt-16 flex justify-between items-center w-full transition duration-200 ease-in-out {editModeEnabled
			? 'opacity-10 scale-95'
			: 'opacity-100 scale-100'}"
	>
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
					disabled={editModeEnabled}
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
					<div class="flex flex-row items-center">
						<div
							on:click|preventDefault={handleEditModeToggle}
							id="editToggle"
							class="mr-8 cursor-pointer opacity-75 hover:opacity-100 transition duration-200 ease-in-out hover:scale-110"
						>
							<GridIcon size="48" strokeWidth="1" />
						</div>

						<AddFormPopover
							channels={mockChannels}
							bind:popOverIsFocused={addFormIsFocused}
							on:channelAdded={(e) => {
								handleChannelAdded(e.detail.channel);
							}}
						/>
					</div>
				{/if}
			</div>
		</div>
	</section>
	{#if !searchIsFocused}
		<section
			style="z-index: -3"
			class="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-8 md:gap-12 lg:gap-16 transition duration-200 ease-in-out {editModeEnabled
				? 'mt-0'
				: 'mt-16'}"
			use:dndzone={{
				items: channels,
				flipDurationMs,
				dropTargetClasses: ['target'],
				dropTargetStyle: { outline: 'none' },
				dragDisabled: !editModeEnabled
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
						if (!editModeEnabled && !addFormIsFocused) {
							selectedChannelIndex = i;
						}
					}}
					on:mouseout={() => {
						if (!editModeEnabled) {
							selectedChannelIndex = null;
						}
					}}
					on:click={() => {
						if (!editModeEnabled) {
							handleProceed(channel);
						}
					}}
					style={editModeEnabled ? '' : 'z-index: -2;'}
					class="channel cursor-pointer flex items-center justify-between flex-col text-center transition duration-200 ease-in-out {selectedChannelIndex ===
					i
						? '-translate-y-1 scale-110'
						: ''}"
				>
					<div
						style={editModeEnabled
							? `animation-duration: ${(
									Math.random() * (jiggleAnimDurationMax - jiggleAnimDurationMin) +
									jiggleAnimDurationMin
							  ).toFixed(4)}s; animation-delay: -${(
									Math.random() * (jiggleAnimDelayMax - jiggleAnimDelayMin) +
									jiggleAnimDelayMin
							  ).toFixed(4)}s;`
							: ''}
						class="text-6xl mb-4 icon flex items-center justify-center"
					>
						{#if channel.iconImageUrl}
							<img
								alt={channel.title}
								style="z-index: 0;"
								class="transition w-16 h-16 duration-300 ease-in-out {selectedChannelIndex === i &&
								!isConsidering &&
								!editModeEnabled
									? ' rotate-3 scale-110'
									: 'rotate-0 scale-100'}"
								src={channel.iconImageUrl}
							/>
						{:else if channel.emoji}
							<div
								class=" transition w-16 h-16 duration-300 ease-in-out {selectedChannelIndex === i &&
								!isConsidering &&
								!editModeEnabled
									? ' rotate-3 scale-110'
									: 'rotate-0 scale-100'}"
							>
								{channel.emoji}
							</div>
						{:else}
							<div
								class="text-black font-light transition w-16 h-16 duration-300 ease-in-out {selectedChannelIndex ===
									i &&
								!isConsidering &&
								!editModeEnabled
									? ' rotate-3 scale-110'
									: 'rotate-0 scale-100'}"
							>
								{channel.title.charAt(0)}
							</div>
						{/if}
					</div>
					<div class="text-2xl">{channel.title}</div>
					<div class="text-md opacity-30">{channel.url}</div>
					{#if editModeEnabled}
						<div class=" flex flex-row items-center mt-4">
							<div
								class="cursor-pointer mx-2 rounded bg-white bg-opacity-5 p-2 hover:bg-opacity-10"
							>
								<Edit2Icon strokeWidth="1" size="16" />
							</div>
							<div
								on:click={() => {
									// TODO allow undo
									channels = channels.filter((c) => c.id !== channel.id);
								}}
								class="cursor-pointer mx-2 rounded p-2  text-white bg-red-500 hover:bg-red-600"
							>
								<XIcon strokeWidth="2" size="16" />
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</section>
		{#if editModeEnabled}
			<div class="flex flex-col items-center justify-center">
				<div
					on:click={handleEditModeToggle}
					class="mx-auto cursor-pointer mt-12 rounded-xl bg-white bg-opacity-10 p-4 font-medium text-lg flex justify-center items-center hover:bg-opacity-20"
				>
					Done
				</div>
				<div class="mt-3 text-center opacity-60">
					Removing or rearranging apps affects your homescreen only.
				</div>
			</div>
		{/if}
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
	/* This will remove the blue outline on drag */
	:focus {
		outline: 0 !important;
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
	}

	.icon {
		width: 120px;
		height: 120px;
		background: linear-gradient(25.13deg, #dbdbdb 15.69%, #ffffff 93.91%);
		border-radius: 40px;
	}
	.icon:nth-child(2n) {
		animation-name: keyframes1;
		animation-iteration-count: infinite;
		transform-origin: 50% 10%;
	}

	.icon:nth-child(2n-1) {
		animation-name: keyframes2;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		transform-origin: 30% 5%;
	}

	@keyframes keyframes1 {
		0% {
			transform: rotate(-1deg);
			animation-timing-function: ease-in;
		}

		50% {
			transform: rotate(1.5deg);
			animation-timing-function: ease-out;
		}
	}

	@keyframes keyframes2 {
		0% {
			transform: rotate(1deg);
			animation-timing-function: ease-in;
		}

		50% {
			transform: rotate(-1.5deg);
			animation-timing-function: ease-out;
		}
	}
</style>
