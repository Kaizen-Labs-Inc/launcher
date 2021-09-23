<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import Channel, { mockChannels } from '../models/Channel';
	import { SearchIcon, PlusCircleIcon } from 'svelte-feather-icons';
	let query = '';
	let searchIsFocused: boolean = false;
	let selectedChannelIndex = 0;

	$: filteredChannels = mockChannels.filter(
		(channel) => channel.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
	);

	const handleProceed = (channel: Channel) => {
		window.open('https://' + channel.url, '_blank').focus();
	};
	const handleBlur = () => {
		let searchInput = document.getElementById('searchInput');
		searchIsFocused = false;
		searchInput.blur();
		selectedChannelIndex = 0;
		query = '';
	};

	onMount(() => {
		document.addEventListener(
			'keydown',
			(event) => {
				let searchInput = document.getElementById('searchInput');
				if (
					searchIsFocused &&
					event.key === 'ArrowDown' &&
					selectedChannelIndex <= filteredChannels.length - 2
				) {
					selectedChannelIndex = selectedChannelIndex + 1;
				}
				if (searchIsFocused && event.key === 'ArrowUp' && selectedChannelIndex > 0) {
					selectedChannelIndex = selectedChannelIndex - 1;
				}
				if (searchIsFocused && event.key === 'Escape') {
					handleBlur();
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
<div class="container mx-auto">
	<nav class="mt-4">
		<ul class="flex flex-row justify-end text-gray-500">
			<li class="cursor-pointer mr-6 hover:text-white">Kaizen Labs</li>
			<li class="cursor-pointer mr-6 hover:text-white">Jordan</li>
		</ul>
	</nav>
	<section class="w-full mt-16 flex justify-between">
		<div class="flex flex-row">
			<SearchIcon size="48" strokeWidth="1" />
			<div class="flex flex-row items-center">
				<input
					bind:value={query}
					on:focus={() => {
						searchIsFocused = true;
					}}
					on:blur={() => {
						handleBlur();
					}}
					autocomplete="false"
					id="searchInput"
					placeholder="Search"
					class="ml-4 text-5xl border-0 outline-none bg-transparent text-white font-light"
				/>
				{#if !searchIsFocused}
					<span
						transition:fade={{ duration: 200 }}
						class="absolute ml-48 border-2 border-white border-opacity-50 w-10 h-10 opacity-50 flex items-center justify-center rounded-md"
						>⌘K</span
					>
				{/if}
			</div>
		</div>
		<button class="cursor-pointer transition duration-200 ease-in-out hover:scale-110"
			><PlusCircleIcon size="48" strokeWidth="1" /></button
		>
	</section>
	{#if !searchIsFocused}
		<section class="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-8 md:gap-12 lg:gap-16 mt-16">
			<!-- TODO allow user to rearrange the channels -->
			{#each mockChannels as channel}
				<div
					on:click|preventDefault={() => {
						handleProceed(channel);
					}}
					class="cursor-pointer flex items-center justify-between flex-col text-center transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
				>
					<div class="text-7xl mb-4">{channel.icon}</div>
					<div class="text-2xl">{channel.title}</div>
					<div class="text-md opacity-30">{channel.url}</div>
				</div>
			{/each}
		</section>
	{:else}
		<section class="flex flex-col w-full mt-8">
			<!-- TODO Have 2 states. A) by last used, when  -->
			{#each filteredChannels.sort((a, b) => a.title.localeCompare(b.title)) as channel, i}
				<div
					on:click|preventDefault={() => {
						handleProceed(channel);
					}}
					on:mouseover={() => {
						selectedChannelIndex = i;
					}}
					on:focus
					class="flex text-left justify-between rounded-2xl cursor-pointer p-6 transition duration-200 ease-in-out  {selectedChannelIndex ===
					i
						? 'bg-white bg-opacity-10 backdrop-blur-md scale-105'
						: 'bg-transparent'}
					"
				>
					<div class="flex flex-row">
						<div class="text-6xl mr-4">{channel.icon}</div>
						<div class="text-2xl">
							{channel.title}
							<div class="block text-sm {selectedChannelIndex === i ? 'opacity-50' : 'opacity-25'}">
								{channel.url}
							</div>
						</div>
					</div>
					<div>{channel.description}</div>
					<div>Tags go here</div>
					<div>Actions go here</div>
				</div>
			{/each}
		</section>
	{/if}
</div>

<style>
</style>
