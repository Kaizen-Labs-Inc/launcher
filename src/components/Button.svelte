<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let label: string;
	export let disabled: boolean = false;
	export let loading: boolean = false;

	const dispatch = createEventDispatcher();
	const handleOnClick = () => {
		if (disabled || loading) {
			return;
		} else {
			dispatch('clicked');
		}
	};
</script>

<div
	on:click={handleOnClick}
	role="button"
	class="rounded px-4 py-2 text-lg bg-white flex items-center justify-center text-black mt-4 {disabled ||
	loading
		? 'opacity-50'
		: 'cursor-pointer'}"
>
	{#if loading}
		Loading...
	{:else}
		{label}
	{/if}
</div>
