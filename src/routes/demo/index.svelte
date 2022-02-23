<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import ChannelGrid from '../../components/ChannelGrid.svelte';
	onMount(() => {
		analytics.page();
	});
</script>

<svelte:head>
	<title>Launcher - demo</title>
</svelte:head>
<div in:fade class="container mx-auto pb-12">
	<ChannelGrid isDemo={true} />
</div>
