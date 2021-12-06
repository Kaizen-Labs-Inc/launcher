<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let label: string;
	export let disabled: boolean = false;
	const dispatch = createEventDispatcher();
	const handleOnClick = () => {
		if (disabled) {
			return;
		} else {
			dispatch('clicked');
		}
	};
</script>

<div
	on:click={handleOnClick}
	class="rounded px-4 py-1 text-lg bg-white flex items-center justify-center text-black mt-4 {disabled
		? 'opacity-50'
		: 'cursor-pointer'}"
>
	{label}
</div>
