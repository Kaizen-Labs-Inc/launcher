<script context="module" lang="ts">
	export const prerender = true;
</script>
<script lang="ts">
	import checkUserAndRedirect from '$lib/checkUserAndRedirect';
	import { userStore } from '../../stores/userStore';
	import { afterNavigate } from '$app/navigation';
	import ChannelGrid from '../../components/ChannelGrid.svelte';

	let user;
	userStore.subscribe((value) => {
		checkUserAndRedirect(value);
		user = value.user;
	});

	afterNavigate(() => {
		window.analytics.page();
	});
</script>

<svelte:head>
	<title>Launcher</title>
</svelte:head>

{#if user}
	<div class="container mx-auto pb-12">
		<ChannelGrid />
	</div>
{/if}
