<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import PublicNav from '../components/nav/PublicNav.svelte';
	import ChannelGrid from '../components/ChannelGrid.svelte';
</script>

<svelte:head>
	<title>Launcher</title>
</svelte:head>
<PublicNav />
<div in:fade class="container mx-auto pb-12">
	<div
		on:click={() => {
			goto('/pricing');
		}}
		class="fixed z-50 bottom-0 mb-10 left-1/2 transform -translate-x-1/2 bg-yellow-200 flex items-center justify-center text-lg shadow-lg px-4 py-2 text-black rounded-lg cursor-pointer"
	>
		🚧 This is a demo. Start your free trial now.
	</div>
	<ChannelGrid />
</div>
