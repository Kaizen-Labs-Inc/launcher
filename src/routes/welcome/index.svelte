<script>
	import { goto } from '$app/navigation';
	import PublicNav from '../../components/nav/PublicNav.svelte';

	import Button from '../../components/Button.svelte';
	const handleContinue = () => {
		goto('/welcome/workspace');
	};
</script>

<PublicNav />
<div class="w-2/3 text-center mx-auto mt-24">
	💳 Payment form goes here. Ideally use Stripe Payment Elements

	<Button label="Continue" on:clicked={handleContinue} />
</div>
