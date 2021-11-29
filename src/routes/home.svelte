<script context="module" lang="ts">
	import ChannelGrid from '../../components/ChannelGrid.svelte';
	import AuthenticatedNav from '../../components/nav/AuthenticatedNav.svelte';
	export const prerender = true;
</script>

<svelte:head>
	<title>Springboard</title>
</svelte:head>
<AuthenticatedNav />
<div class="container mx-auto pb-12">
	<ChannelGrid />
</div>
