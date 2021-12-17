<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import AddChannelPopover from '../components/AddChannelPopover.svelte';
	import ChannelSearchDropdown from '../components/ChannelSearchDropdown.svelte';
	import Channel from '../model/Channel';
	import tippy, { Instance } from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/themes/translucent.css';
	import { SearchIcon, Edit2Icon, XIcon } from 'svelte-feather-icons';
	import { goto } from '$app/navigation';
	import { addToast } from '../stores/toaststore';
	import Board from '../model/Board';
	import { BoardType } from '../model/api/BoardType';
	import { isMobileDevice } from '../utils/DetectDevice';
	import { trimUrl } from '../utils/TrimUrl';
	import filterChannelsByQuery from '../lib/filterChannelsByQuery';
	import { Backdrop, backdropOptions } from '../model/Backdrop';
	import { backdropStore } from '../stores/backdropStore';

	export let isDemo = false;
	let editModeEnabled: boolean = false;
	let selectedBackdrop: Backdrop;
	let tippyInstance: Instance;
	let query: string = '';
	let searchIsFocused: boolean = false;
	let addFormIsFocused: boolean = false;
	let selectedChannelIndex: number;
	let isMobile: boolean = false;
	let board: Board;
	let channelsToSearch: Channel[];
	const flipDurationMs: number = 200;
	let isConsidering: boolean = false;
	let editModeInitializedByDrag: boolean = false;
	let addChannelPopoverStepOneComplete: boolean = false;
	// For edit mode jiggles
	const jiggleAnimDelayMin: number = -0.75;
	const jiggleAnimDelayMax: number = -0.05;
	const jiggleAnimDurationMin: number = 0.22;
	const jiggleAnimDurationMax: number = 0.3;

	$: filteredChannels = (channelsToSearch || []).filter((channel) =>
		filterChannelsByQuery(channel, query.toLowerCase())
	);

	const handleDndConsider = (e) => {
		if (!editModeEnabled) {
			editModeInitializedByDrag = true;
		}
		isConsidering = true;
		editModeEnabled = true;
		board.positions = e.detail.items;
		selectedChannelIndex = null;
	};
	const handleDndFinalize = (e) => {
		if (editModeInitializedByDrag) {
			editModeEnabled = false;
		}
		isConsidering = false;
		editModeInitializedByDrag = false;
		board.positions = e.detail.items;
		orderAndSyncBoardPositions();
	};

	function orderAndSyncBoardPositions() {
		// ensure positions are numerically correct
		// 5up3rH4ck (TM) assign an id if none so that DND can handle it
		let maxId = Math.max(...board.positions.map((it) => it.id || 0));
		board.positions = board.positions.map((p, i) =>
			Object.assign({ id: ++maxId }, p, { position: i })
		);
		if (!isDemo) {
			if (board.boardType === BoardType.USER.valueOf()) {
				return fetch(`/api/board/${board.id}/position`, {
					method: 'PUT',
					credentials: 'include',
					body: JSON.stringify(board.positions)
				});
			} else {
				return fetch('/api/board', {
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify(board)
				}).then(assignBoard);
			}
		}
	}

	const handleProceed = (channel: Channel) => {
		selectedChannelIndex = null;
		window.open('https://' + channel.url, '_blank').focus();
		analytics.track('Channel clicked', {
			channel: channel
		});
	};

	const handleEdit = (channel: Channel) => {
		goto(`/app/edit?id=${channel.id}`);
	};

	const handleRemove = (channel: Channel) => {
		// TODO allow undo
		board.positions = board.positions.filter((p) => p.channel.id !== channel.id);
		orderAndSyncBoardPositions();
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
			let searchInput = document.getElementById('searchInput');
			searchInput.focus();
			searchIsFocused = true;
			selectedChannelIndex = 0;
		}
	};

	const handleInput = () => {
		selectedChannelIndex = 0;
	};

	async function handleChannelAdded(channel) {
		let newPosition = { position: 0, channel: channel };
		if (!isDemo) {
			if (!channel.id) {
				await fetch('/api/channel', {
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify(channel)
				}).then(async (res) => {
					// 409 means a channel with this URL already exists; add it instead
					if (res.status === 201 || res.status === 409) {
						newPosition = { position: 0, channel: await res.json() };
					}
				});
			}
		}
		board.positions.unshift(newPosition);
		await orderAndSyncBoardPositions();
		addToast({ dismissible: false, message: 'Added', type: 'success', timeout: 3000 });
		handleBlur();
		analytics.track('Channel added', {
			channel: channel
		});
	}

	const toggleAddForm = () => {
		// This prevents the popover from appearing in a strange place
		setTimeout(function () {
			addFormIsFocused = !addFormIsFocused;
		}, 100);
		analytics.track('Add channel button clicked');
	};

	const handleEditModeToggle = () => {
		editModeEnabled = true;
		tippyInstance.disable();
		analytics.track('Edit mode button clicked');
	};

	backdropStore.subscribe((value) => {
		selectedBackdrop = value;
	});

	const handleSelectedBackdrop = (id: number) => {
		backdropStore.set(backdropOptions.find((b) => b.id === id));
	};

	async function assignBoard(res) {
		const b = await res.json();
		b.positions.sort((a, b) => {
			return a.position - b.position;
		});
		board = b;
		// Toggle Tippy off if there are no channels on the board
		if (board.positions.length > 0) {
			tippyInstance = tippy(document.getElementById('editToggle'), {
				content: 'Edit launcher',
				arrow: false,
				theme: 'translucent'
			});
		}
	}
	onMount(() => {
		fetch('api/board', {
			credentials: 'include'
		})
			.then(assignBoard)
			.catch((err) => {
				console.error(err.message);
			});
		fetch('/api/channel', {
			credentials: 'include'
		}).then(async (res) => {
			channelsToSearch = await res.json();
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
			if (
				editModeEnabled &&
				e.target.parentElement.id !== 'editToggle' &&
				e.target.parentElement.id !== 'backdropSelector'
			) {
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
				on:click
				disabled={addFormIsFocused || editModeEnabled}
				autocomplete="false"
				id="searchInput"
				placeholder="Search"
				class="ml-4 text-2xl sm:text-5xl w-2/3 border-0 outline-none bg-transparent font-light transition duration-200 ease-in-out placeholder-opacity-50 {selectedBackdrop.darkMode
					? 'placeholder-white'
					: 'placeholder-black'} {addFormIsFocused ? 'opacity-5 scale-95' : ''}"
			/>
			{#if !searchIsFocused}
				<span
					on:click={handleFocus}
					class="absolute cursor-pointer ml-24 sm:ml-48 sm:text-base text-xs bg-white bg-opacity-25 sm:w-10 sm:h-10 h-8 w-8 opacity-50 flex items-center justify-center rounded-md transition duration-200 ease-in-out {addFormIsFocused
						? 'opacity-5 scale-95'
						: ''}">⌘G</span
				>

				<div class="flex flex-row items-center">
					{#if board?.positions.length > 0}
						<div
							on:click={handleEditModeToggle}
							id="editToggle"
							class="mr-8 sm:w-8 sm:h-8 w-6 h-6 {editModeEnabled
								? ''
								: 'cursor-pointer hover:opacity-100 hover:scale-110'} opacity-75 transition duration-200 ease-in-out"
						>
							<Edit2Icon strokeWidth="1" />
						</div>
					{/if}
					<AddChannelPopover
						channels={channelsToSearch || []}
						board={board}
						bind:stepOneComplete={addChannelPopoverStepOneComplete}
						bind:popOverIsFocused={addFormIsFocused}
						bind:editModeEnabled
						bind:selectedBackdrop
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
	{#if editModeEnabled && !editModeInitializedByDrag}
		<ul id="backdropSelector" class="flex flex-wrap items center justify-center">
			{#each backdropOptions as backdropOption}
				{#if backdropOption.colors.length === 1}
					<li
						on:click={() => {
							handleSelectedBackdrop(backdropOption.id);
						}}
						style="background-color: {backdropOption.colors[0]}"
						class="m-2 rounded-full w-10 h-10 {selectedBackdrop.id === backdropOption.id
							? 'border-4 border-white'
							: ''} shadow-lg cursor-pointer bg-opacity-75 hover:bg-opacity-100 hover:shadow-xl transition duration-200 ease-in-out hover:scale-110"
					/>
				{:else}
					<li
						on:click={() => {
							handleSelectedBackdrop(backdropOption.id);
						}}
						style="background-image: radial-gradient(at 0% 50%, {backdropOption
							.colors[0]} 0, transparent 100%),
				radial-gradient(at 0% 100%, {backdropOption.colors[1]} 0, transparent 50%),
				radial-gradient(at 80% 100%, {backdropOption.colors[2]} 0, transparent 50%),
				radial-gradient(at 0% 0%, {backdropOption.colors[3]} 0, transparent 50%);"
						class="m-2 rounded-full w-10 h-10 {selectedBackdrop.id === backdropOption.id
							? 'border-4 border-white'
							: ''} shadow-lg cursor-pointer bg-opacity-75 hover:bg-opacity-100 hover:shadow-xl transition duration-200 ease-in-out hover:scale-110"
					/>
				{/if}
			{/each}
		</ul>
	{/if}
	<section
		class="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start mt-12 transition duration-200 ease-in-out"
		use:dndzone={{
			items: board?.positions || [],
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
		{#each board?.positions || [] as position, i (position.id)}
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
						handleProceed(position.channel);
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
					{#if position.channel.image}
						{#if position.channel.image.split('.').pop() === 'ico'}
							<div class="flex items-center justify-center bg-white rounded-full w-14 h-14">
								<img
									alt={position.channel.name}
									style="z-index: 0;"
									class="transition w-8 h-8 duration-300 ease-in-out"
									src={position.channel.image}
								/>
							</div>
						{:else}
							<img
								alt={position.channel.name}
								style="z-index: 0;"
								class="transition w-16 h-16 duration-300 ease-in-out"
								src={position.channel.image}
							/>
						{/if}
					{:else if position.channel.emoji}
						<div class=" transition w-16 h-16 duration-300 ease-in-out">
							{position.channel.emoji}
						</div>
					{:else}
						<div class="text-black font-light transition w-16 h-16 duration-300 ease-in-out">
							{position.channel.name.charAt(0)}
						</div>
					{/if}
				</div>
				<div>
					<div class="text-2xl">{position.channel.name}</div>
					<div class="text-md opacity-30">
						{trimUrl('https://' + position.channel.url)}
					</div>
				</div>
				{#if editModeEnabled && !editModeInitializedByDrag}
					<div
						class="flex flex-row items-center mt-4 transition duration-250 ease-in-out {isConsidering
							? 'opacity-0 scale-50'
							: 'opacity-100 scale-100'}"
					>
						<div
							on:click={() => {
								handleEdit(position.channel);
							}}
							class="cursor-pointer mx-2 rounded bg-white bg-opacity-50 p-2 hover:bg-opacity-10"
						>
							<Edit2Icon strokeWidth="1" size="16" />
						</div>
						<div
							on:click={() => {
								handleRemove(position.channel);
								analytics.track('Delete channel button clicked', {
									channel: channel
								});
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
				class="mx-auto cursor-pointer mt-24 rounded-xl bg-white bg-opacity-10 p-4 font-medium text-lg flex justify-center items-center hover:bg-opacity-20"
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
		bind:positions={board.positions}
		on:appSelected={(event) => {
			handleProceed(event.detail.channel);
		}}
		on:addClicked={(event) => {
			handleChannelAdded(event.detail.channel);
		}}
		on:editClicked={(event) => {
			handleEdit(event.detail.channel);
		}}
		on:newChannelClicked={() => {
			addChannelPopoverStepOneComplete = true;
			toggleAddForm();
		}}
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
