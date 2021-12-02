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
		class="hover:-translate-y-1 hover:bg-white transform transition-all duration-150
		ease-in-out fixed z-50 bottom-10 inset-x-0 mx-4 md:mx-auto sm:w-full md:w-2/3 lg:w-1/3
		<5></5>  text-center  bg-yellow-200 flex items-center justify-center text-lg shadow-lg px-4 py-2 text-black rounded-lg cursor-pointer"
	>
		🚧 This is a demo. Start your free trial today.
	</div>
	<ChannelGrid />
</div>
