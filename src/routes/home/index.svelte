<script context="module" lang="ts">
	import { onMount } from 'svelte';
	import ChannelGrid from '../../components/ChannelGrid.svelte';
	export const prerender = true;
	onMount(() => {
		window.analytics.page();
	});
</script>

<svelte:head>
	<title>Launcher</title>
</svelte:head>

<div class="container mx-auto pb-12">
	<ChannelGrid />
</div>
