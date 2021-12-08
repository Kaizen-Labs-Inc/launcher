<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { authorizeUser } from '$lib/authorizeUser';

	import { onMount } from 'svelte';
	import ChannelGrid from '../../components/ChannelGrid.svelte';

	onMount(() => {
		window.analytics.page();
		authorizeUser();
	});
</script>

<svelte:head>
	<title>Launcher</title>
</svelte:head>

<div class="container mx-auto pb-12">
	<ChannelGrid />
</div>
