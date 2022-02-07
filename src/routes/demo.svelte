<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { variables } from '../lib/env';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import ChannelGrid from '../components/ChannelGrid.svelte';
	let isHovering: boolean = false;
	onMount(() => {
		window.analytics.page();
	});
</script>

<svelte:head>
	<title>Launcher - demo</title>
</svelte:head>
<div in:fade class="container mx-auto pb-12">
	{#if variables.modeOSS !== false}
		<div
			on:click={() => {
				goto('/pricing');
			}}
			on:mouseover={() => {
				isHovering = true;
			}}
			on:mouseout={() => {
				isHovering = false;
			}}
			on:focus
			on:blur
			class="hover:-translate-y-1 hover:bg-white transform transition-all duration-150
			ease-in-out fixed z-40 bottom-6 right-6 mx-4 sm:w-full md:w-2/3 lg:w-1/3
			 text-center  bg-yellow-200 flex items-center justify-center text-lg shadow-lg px-4 py-2 text-black rounded-lg cursor-pointer"
		>
			{isHovering ? '👍' : '🚧'} This is a demo. Start your free trial today.
		</div>
	{/if}
	<ChannelGrid isDemo={true} />
</div>
