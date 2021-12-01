<script lang="ts">
	import ChannelForm from '../../components/ChannelForm.svelte';
	import { goto } from '$app/navigation';
	import MockChannel, { mockChannels } from '../../model/MockChannel';
	import { page } from '$app/stores';
	import AuthenticatedNav from '../../components/nav/AuthenticatedNav.svelte';
	// Use channel ID to get details...
	let channel: MockChannel = mockChannels.find((c) => c.id === $page.query.get('id'));
	console.log(channel);
</script>

<AuthenticatedNav />
<h1 class="mt-16">Edit {channel.name}</h1>

<ChannelForm
	{channel}
	on:submit={(event) => {
		goto('/');
	}}
/>

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
