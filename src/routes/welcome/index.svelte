<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import Button from '../../components/Button.svelte';
	const handleContinue = () => {
		goto('/welcome/workspace');
	};
	onMount(() => {
		window.analytics.page();
	});
</script>

<div class="w-2/3 text-center mx-auto mt-24">
	💳 Payment form goes here. Ideally use Stripe Payment Elements

	<Button label="Continue" on:clicked={handleContinue} />
</div>
