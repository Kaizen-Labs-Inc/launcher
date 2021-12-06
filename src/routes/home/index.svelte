<script context="module" lang="ts">
	import ChannelGrid from '../../components/ChannelGrid.svelte';
	export const prerender = true;
</script>

<svelte:head>
	<title>Launcher</title>
</svelte:head>

<div class="container mx-auto pb-12">
	<ChannelGrid />
</div>
