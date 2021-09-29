<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import AddFormPopover from '../components/AddFormPopover.svelte';
	import AppSearchDropdown from '../components/AppSearchDropdown.svelte';
	import Channel, { mockChannels } from '../models/Channel';
	import { SearchIcon } from 'svelte-feather-icons';
	let query = '';
	let searchIsFocused: boolean = false;
	let selectedChannelIndex;
	let channels = mockChannels;
	$: filteredChannels = channels.filter(
		// TODO also filter by description, tags, and URL
		(channel) => channel.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
	);

	const handleProceed = (channel: Channel) => {
		// TODO popover/content blockers are getting in the way of this
		// https://stackoverflow.com/questions/2587677/avoid-browser-popup-blockers
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
	onMount(() => {
		document.addEventListener(
			'keydown',
			(event) => {
				let searchInput = document.getElementById('searchInput');
				// Used for keeping the selected element in the dropdown in view
				let dropdownContainer = document.getElementById('appDropdown');
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
	<nav class="mt-4">
		<ul class="flex flex-row justify-end text-gray-400">
			<li class="cursor-pointer mr-6 hover:text-white">Invite someone</li>
			<li class="cursor-pointer mr-6 hover:text-white">Kaizen Labs</li>
			<li class="cursor-pointer mr-6 hover:text-white">Sign out</li>
		</ul>
	</nav>
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
					on:focus={() => {
						handleFocus();
					}}
					on:blur={() => {
						handleBlur();
					}}
					on:input={() => {
						handleInput();
					}}
					autocomplete="false"
					id="searchInput"
					placeholder="Search"
					class="ml-4 text-5xl border-0 outline-none bg-transparent text-white font-light"
				/>
				{#if !searchIsFocused}
					<span
						class="absolute ml-48 border-2 border-white border-opacity-50 w-10 h-10 opacity-50 flex items-center justify-center rounded-md"
						>⌘K</span
					>
					<AddFormPopover
						on:channelAdded={(e) => {
							handleChannelAdded(e.detail.channel);
						}}
					/>
				{/if}
			</div>
		</div>
	</section>
	{#if !searchIsFocused}
		<section class="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-8 md:gap-12 lg:gap-16 mt-16">
			<!-- TODO allow user to rearrange the channels -->
			<!-- TODO create icons for top ~100 saas apps -->
			<!-- Make beautiful, 3 dimensional, follow cursor -->
			{#each channels as channel, i}
				<div
					on:focus
					on:blur
					on:mouseover={() => {
						selectedChannelIndex = i;
					}}
					on:mouseout={() => {
						selectedChannelIndex = null;
					}}
					on:click|preventDefault={() => {
						handleProceed(channel);
					}}
					class="cursor-pointer flex items-center justify-between flex-col text-center transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
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
</style>
