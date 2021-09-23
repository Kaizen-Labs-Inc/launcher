<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import { goto } from '$app/navigation';
	import { SearchIcon, PlusCircleIcon } from 'svelte-feather-icons';
	let query = '';
	let searchIsFocused: boolean = false;
	$: filteredChannels = channels.filter(
		(channel) => channel.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
	);
	onMount(() => {
		document.addEventListener(
			'keydown',
			(event) => {
				let searchInput = document.getElementById('searchInput');
				if (event.metaKey && event.key === 'k' && searchInput !== document.activeElement) {
					searchInput.focus();
				}
			},
			false
		);
	});
	const channels = [
		{
			id: 1,
			icon: '✉️',
			title: 'Gmail',
			url: 'mail.google.com',
			description: 'Lorem ipsum'
		},
		{
			id: 2,
			icon: '🗓',
			title: 'Calendar',
			url: 'calendar.google.com',

			description: 'Lorem ipsum'
		},

		{
			id: 3,
			icon: '💬',
			title: 'Slack',
			url: 'kaizen-enps.slack.com',
			description: 'Lorem ipsum'
		},
		{
			id: 4,
			icon: '📓',
			title: 'Notion',
			url: 'notion.so',
			description: 'Lorem ipsum'
		},
		{
			id: 5,
			icon: '📬',
			title: 'Customer.io',
			url: 'customer.io',
			description: 'Lorem ipsum'
		},
		{
			id: 6,
			icon: '🖇',
			title: 'Trello',
			url: 'trello.com',
			description: 'Lorem ipsum'
		},
		{
			id: 7,
			icon: '📈',
			title: 'Mixpanel',
			url: 'mixpanel.com',
			description: 'Lorem ipsum'
		},
		{
			id: 7,
			icon: '💸',
			title: 'Rippling',
			url: 'rippling.com',
			description: 'Lorem ipsum'
		},
		{
			id: 7,
			icon: '☎',
			title: 'Zendesk',
			url: 'zendesk.com',
			description: 'Lorem ipsum'
		},
		{
			id: 7,
			icon: '💼',
			title: 'Salesforce',
			url: 'kaizen.salesforce.com',
			description: 'Lorem ipsum'
		}
	];
</script>

<svelte:head>
	<title>Springboard</title>
</svelte:head>
<div class="container mx-auto">
	<nav class="mt-4">
		<ul class="flex flex-row justify-end text-gray-500">
			<li class="cursor-pointer mr-6 hover:text-white">Kaizen Labs</li>
			<li class="cursor-pointer mr-6 hover:text-white">Jordan</li>
			<li class="cursor-pointer hover:text-white">Sign out</li>
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
					}}
					id="searchInput"
					placeholder="Search"
					class="ml-4 text-5xl border-0 outline-none bg-transparent text-white font-light"
				/>
				{#if !searchIsFocused}
					<span
						transition:fade={{ duration: 200 }}
						class="border-2 border-white border-opacity-50 w-10 h-10 opacity-50 flex items-center justify-center rounded-md"
						>⌘K</span
					>
				{/if}
			</div>
		</div>
		<button class="cursor-pointer transition duration-200 ease-in-out hover:scale-110"
			><PlusCircleIcon size="48" strokeWidth="1" /></button
		>
	</section>
	<section class="grid lg:grid-cols-6 md:grid-cols-4 cols-2 gap-8 md:gap-12 lg:gap-16 mt-16">
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
</div>

<style>
</style>
