<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import Button from '../../components/Button.svelte';
	import { userStore } from '../../stores/userStore';
	import checkUserAndRedirect from '$lib/checkUserAndRedirect';
	const handleContinue = () => {
		goto('/welcome/workspace');
	};

	let user;
	userStore.subscribe((value) => {
		checkUserAndRedirect(value);
		user = value.user;
	});
	onMount(() => {
		window.analytics.page();
	});
</script>

{#if user}
	<div class="w-2/3 text-center mx-auto mt-24">
		💳 Payment form goes here. Ideally use Stripe Payment Elements

		<Button label="Continue" on:clicked={handleContinue} />
	</div>
{/if}
