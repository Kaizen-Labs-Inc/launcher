<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import type Channel from '../model/Channel';
	import { CheckIcon, Edit2Icon, PlusIcon } from 'svelte-feather-icons';
	export let channelIds: number[];
	export let channel: Channel;
	const dispatch = createEventDispatcher();
	const handleEdit = (channel) => {
		dispatch('editClicked', {
			channel: channel
		});
	};

	const handleAdd = (channel) => {
		dispatch('addClicked', {
			channel: channel
		});
	};
</script>

<div class="w-full flex justify-end">
	<div
		on:click|preventDefault={(channel) => {
			handleAdd(channel);
		}}
		class="addChannelButton w-12 h-12 mr-3 {channelIds.includes(channel.id)
			? 'cursor-default opacity-70'
			: 'hover:bg-white hover:bg-opacity-10 rounded-md cursor-pointer'} flex justify-center items-center"
	>
		<!-- TODO if already added to homescreen, show a checkmark with no-op -->
		{#if channelIds.includes(channel.id)}
			<CheckIcon size="20" strokeWidth="1" />
		{:else}
			<PlusIcon size="20" strokeWidth="1" />
		{/if}
	</div>
	<div
		on:click|preventDefault={(channel) => {
			handleEdit(channel);
		}}
		class="w-12 h-12 hover:bg-white hover:bg-opacity-10 rounded-md flex justify-center items-center"
	>
		<Edit2Icon size="20" strokeWidth="1" />
	</div>
</div>
