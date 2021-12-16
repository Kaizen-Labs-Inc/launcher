<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { XIcon } from 'svelte-feather-icons';

	const dispatch = createEventDispatcher();

	export let type = 'error';
	export let dismissible = true;
</script>

<article class={type + ' shadow-lg'} role="alert" transition:fade>
	<slot />

	{#if dismissible}
		<button class="close" on:click={() => dispatch('dismiss')}>
			<XIcon size="26" />
		</button>
	{/if}
</article>

<style lang="postcss">
	article {
		color: white;
		padding: 0.7rem;
		border-radius: 0.4rem;
		display: flex;
		align-items: center;
		margin: 0 auto 0.5rem auto;
		width: auto;
	}
	.error {
		background: IndianRed;
	}
	.success {
		background: MediumSeaGreen;
	}
	.info {
		background: white;
		color: black;
	}

	button {
		color: white;
		background: transparent;
		border: 0 none;
		padding: 0;
		margin: 0 0 0 auto;
		line-height: 1;
		font-size: 1rem;
	}
</style>
