<script lang="ts">
	import { onMount } from 'svelte';
	import ChannelForm from '../../components/ChannelForm.svelte';
	import { goto } from '$app/navigation';
	import MockChannel, { mockChannels } from '../../model/MockChannel';
	import { page } from '$app/stores';
	import { userStore } from '../../stores/userStore';
	import checkUserAndRedirect from '$lib/checkUserAndRedirect';
	// Use channel ID to get details...

	let channel: Channel = mockChannels.find((c) => c.id === $page.query.get('id'));
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
	<title>Launcher - Edit app</title>
</svelte:head>
{#if user}
	<h1 class="mt-16">Edit {channel.title}</h1>
	<ChannelForm
		channel={channel}
		on:submit={() => {
			goto('/');
		}}
	/>
{/if}

<style>
	.tagsContainer :global(.svelte-tags-input) {
		background: transparent;
		padding-top: 4px;
		padding-bottom: 4px;
		font-size: 16px;
	}
	.tagsContainer :global(.svelte-tags-input-tag) {
		border-radius: 3px;
		background: rgba(255, 255, 255, 0.1);
		font-size: 16px;
		padding: 4px;
	}

	.tagsContainer :global(.svelte-tags-input-tag-remove) {
		margin-left: 5px;
	}
	.tagsContainer :global(.svelte-tags-input-layout) {
		background-color: rgba(255, 255, 255, 0.1);
		border: none;
		outline: none;
	}

	.tagsContainer :global(.svelte-tags-input-layout:focus) {
		border: none;
	}
	.tagsContainer :global(.svelte-tags-input-layout:hover) {
		border: none;
	}
</style>
