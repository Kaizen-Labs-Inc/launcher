<script lang="ts">
	import { onMount } from 'svelte';
	import ChannelForm from '../../../components/ChannelForm.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { userStore } from '../../../stores/userStore';
	import checkUserAndRedirect from '../../../lib/checkUserAndRedirect';
	import Channel from '../../../model/Channel';
	import LoadingIndicator from '../../../components/LoadingIndicator.svelte';
	import { backdropStore } from '../../../stores/backdropStore';
	import { Backdrop } from '../../../model/Backdrop';
	import { addToast } from '../../../stores/toaststore';

	let selectedBackdrop: Backdrop;
	let channel: Channel;
	let user;
	userStore.subscribe((value) => {
		checkUserAndRedirect(value);
		user = value.user;
	});
	const id = $page.params.id;

	onMount(() => {
		window.analytics.page();
		fetch(`/api/channel/${id}`, {
			credentials: 'include'
		}).then(async res => {
			if (res.status === 200) {
				channel = await res.json();
			}
		});
	});

	function submitChannel(event: any) {
		fetch(`/api/channel/${id}`, {
			method: 'PUT',
			body: JSON.stringify(event.detail.channel),
			credentials: 'include'
		}).then(async res => {
			if (res.status === 200) {
				addToast({
					type: 'success',
					message: `Updated`,
					dismissible: false,
					timeout: 3000
				})
				goto('/home');
			} else {
				addToast({
					type: 'error',
					message: `Error: ${res.status}`,
					dismissible: false,
					timeout: 3000
				})
			}
		});
	}

	backdropStore.subscribe((value) => {
		selectedBackdrop = value;
	});
</script>

<svelte:head>
	<title>Launcher - Edit app</title>
</svelte:head>
{#if channel}
	<h1 class="mt-16">Edit {channel.name}</h1>
	<ChannelForm
		channel={channel}
		on:submit={submitChannel}
		bind:selectedBackdrop
	/>
{:else}
	<div
		style="height: 100vh; margin-right: auto; margin-left: auto; display: flex; align-items: center; justify-content: center"
	>
		<LoadingIndicator />
	</div>
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
