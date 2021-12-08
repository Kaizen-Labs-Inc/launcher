<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import checkUserAndRedirect from '$lib/checkUserAndRedirect';
	import { userStore } from '../../stores/userStore';
	import { onMount } from 'svelte';
	import ChannelGrid from '../../components/ChannelGrid.svelte';
	let user;
	userStore.subscribe((value) => {
		checkUserAndRedirect(value);
		user = value.user;
	});

	onMount(() => {
		window.analytics.page();
	});
</script>

<svelte:head>
	<title>Launcher.team</title>
</svelte:head>

{#if user}
	<div class="container mx-auto pb-12">
		<ChannelGrid />
	</div>
{/if}
