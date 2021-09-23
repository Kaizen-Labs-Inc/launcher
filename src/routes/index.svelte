<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import { mockChannels } from '../models/Channel';
	import { SearchIcon, PlusCircleIcon } from 'svelte-feather-icons';
	let query = '';
	let searchIsFocused: boolean = false;
	$: filteredChannels = mockChannels.filter(
		(channel) => channel.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
	);
	onMount(() => {
		document.addEventListener(
			'keydown',
			(event) => {
				let searchInput = document.getElementById('searchInput');
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
					on:click={() => {
						searchIsFocused = true;
					}}
					on:blur={() => {
						searchIsFocused = false;
						query = '';
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
			{#each filteredChannels as channel}
				<div
					on:click={() => {
						window.open('https://' + channel.url, '_blank').focus();
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
		table goes here...
	{/if}
</div>

<style>
</style>
