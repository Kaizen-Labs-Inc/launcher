<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';

	import { dndzone } from 'svelte-dnd-action';
	import AddChannelPopover from '../components/AddChannelPopover.svelte';
	import ChannelSearchDropdown from '../components/ChannelSearchDropdown.svelte';
	import Channel, { mockChannels } from '../model/Channel';
	import tippy, { Instance } from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/themes/translucent.css';
	import { SearchIcon, Edit2Icon, XIcon } from 'svelte-feather-icons';
	import { goto } from '$app/navigation';
	import { addToast } from '../stores/toaststore';
	import { isMobileDevice } from '../utils/DetectDevice';

	let tippyInstance: Instance;
	let query: string = '';
	let searchIsFocused: boolean = false;
	let addFormIsFocused: boolean = false;
	let selectedChannelIndex: number;
	let isMobile: boolean = false;
	let channels: Channel[] = mockChannels.splice(0, 12); // TODO update this
	const flipDurationMs: number = 200;
	let isConsidering: boolean = false;
	let editModeEnabled: boolean = false;
	let editModeInitializedByDrag: boolean = false;

	// For edit mode jiggles
	const jiggleAnimDelayMin: number = -0.75;
	const jiggleAnimDelayMax: number = -0.05;
	const jiggleAnimDurationMin: number = 0.22;
	const jiggleAnimDurationMax: number = 0.3;

	$: filteredChannels = channels.filter(
		// TODO also filter by description, tags, and URL
		(channel) => channel.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
	);
	const handleDndConsider = (e) => {
		if (!editModeEnabled) {
			editModeInitializedByDrag = true;
		}
		isConsidering = true;
		editModeEnabled = true;
		channels = e.detail.items;
		selectedChannelIndex = null;
	};
	const handleDndFinalize = (e) => {
		if (editModeInitializedByDrag) {
			editModeEnabled = false;
		}
		isConsidering = false;
		editModeInitializedByDrag = false;
		channels = e.detail.items;
	};

	const handleProceed = (channel: Channel) => {
		selectedChannelIndex = null;
		window.open('https://' + channel.url, '_blank').focus();
	};

	const handleEdit = (channel: Channel) => {
		goto(`/app/edit?id=${channel.id}`);
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
		addToast({ dismissible: false, message: 'Added', type: 'success', timeout: 3000 });
	};

	const toggleAddForm = () => {
		// This prevents the popover from appearing in a strange place
		setTimeout(function () {
			addFormIsFocused = !addFormIsFocused;
		}, 100);
	};

	const handleEditModeToggle = () => {
		editModeEnabled = true;
		tippyInstance.disable();
	};

	onMount(() => {
		tippyInstance = tippy(document.getElementById('editToggle'), {
			content: 'Edit launcher',
			arrow: false,
			theme: 'translucent'
		});

		isMobile = isMobileDevice();

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
					event.key === 'g' &&
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

		document.addEventListener('mousedown', function (e) {
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
					editModeInitializedByDrag = false;
					tippyInstance.enable();
				}
			}
		});
	});
</script>

<section
	class="mt-16 flex justify-between items-center w-full transition duration-200 ease-in-out {editModeEnabled
		? 'opacity-10 scale-95'
		: 'opacity-100 scale-100'}"
>
	<div
		class="flex items-center p-4 rounded-t-lg w-full {searchIsFocused
			? 'bg-white bg-opacity-10'
			: ''}"
	>
		<div
			class="sm:w-12 sm:h-12 w-6 h-6 flex-shrink-0 transition duration-200 ease-in-out {addFormIsFocused
				? 'opacity-5 scale-95'
				: ''}"
		>
			<SearchIcon strokeWidth="1" />
		</div>
		<div class="flex flex-row items-center justify-between w-full">
			<input
				bind:value={query}
				on:focus={handleFocus}
				on:blur={handleBlur}
				on:input={handleInput}
				disabled={addFormIsFocused}
				autocomplete="false"
				id="searchInput"
				placeholder="Search"
				class="ml-4 text-2xl sm:text-5xl w-2/3 border-0 outline-none bg-transparent text-white font-light placeholder-white placeholder-opacity-30 transition duration-200 ease-in-out {addFormIsFocused
					? 'opacity-5 scale-95'
					: ''}"
			/>
			{#if !searchIsFocused}
				<span
					class="absolute ml-24 sm:ml-48 sm:text-base text-xs border-2 border-white border-opacity-50 sm:w-10 sm:h-10 h-8 w-8 opacity-50 flex items-center justify-center rounded-md transition duration-200 ease-in-out {addFormIsFocused
						? 'opacity-5 scale-95'
						: ''}">⌘G</span
				>

				<div class="flex flex-row items-center">
					<div
						on:click={handleEditModeToggle}
						id="editToggle"
						class="mr-8 sm:w-8 sm:h-8 w-6 h-6 {editModeEnabled
							? ''
							: 'cursor-pointer hover:opacity-100 hover:scale-110'} opacity-75 transition duration-200 ease-in-out"
					>
						<Edit2Icon strokeWidth="1" />
					</div>

					<AddChannelPopover
						{channels}
						bind:popOverIsFocused={addFormIsFocused}
						bind:editModeEnabled
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
		class="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-8 md:gap-12 lg:gap-16 transition duration-200 ease-in-out mt-16 {editModeEnabled
			? '-translate-y-10'
			: ''}"
		use:dndzone={{
			items: channels,
			flipDurationMs,
			dragDisabled: addFormIsFocused || (isMobile && !editModeEnabled),
			morphDisabled: true,
			dropTargetClasses: ['target'],
			dropTargetStyle: { outline: 'none' },
			transformDraggedElement: (el, data, i) => {
				// TODO
				// We want to remove the delete and edit buttons when dragging
			}
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
					if (!editModeEnabled && !addFormIsFocused) {
						handleProceed(channel);
					}
				}}
				class="channel flex items-center justify-center flex-col text-center transition duration-200 ease-in-out {addFormIsFocused
					? 'opacity-5 scale-95 pointer-events-none'
					: 'opacity-100 hover:scale-105 cursor-pointer'}"
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
							class="transition w-16 h-16 duration-300 ease-in-out"
							src={channel.iconImageUrlDark ? channel.iconImageUrlDark : channel.iconImageUrl}
						/>
					{:else if channel.emoji}
						<div class=" transition w-16 h-16 duration-300 ease-in-out">
							{channel.emoji}
						</div>
					{:else}
						<div class="text-black font-light transition w-16 h-16 duration-300 ease-in-out">
							{channel.title.charAt(0)}
						</div>
					{/if}
				</div>
				<div>
					<div class="text-2xl">{channel.title}</div>
					<div class="text-md opacity-30">{channel.url}</div>
				</div>
				{#if editModeEnabled && !editModeInitializedByDrag}
					<div
						class="flex flex-row items-center mt-4 transition duration-250 ease-in-out {isConsidering
							? 'opacity-0 scale-50'
							: 'opacity-100 scale-100'}"
					>
						<div
							on:click={() => {
								handleEdit(channel);
							}}
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
	{#if editModeEnabled && !editModeInitializedByDrag}
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
	<ChannelSearchDropdown
		bind:selectedChannelIndex
		bind:filteredChannels
		on:appSelected={(event) => {
			handleProceed(event.detail.channel);
		}}
		on:addClicked={(event) => {
			handleChannelAdded(event.detail.channel);
		}}
		on:editClicked={(event) => {
			handleEdit(event.detail.channel);
		}}
		on:newChannelClicked={toggleAddForm}
	/>
{/if}

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

	.draggedEl {
		font-size: 100px !important;
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
