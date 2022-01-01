<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import atobUnicode from '../lib/atobUnicode';

	let email
	onMount(() => {
		window.analytics.page();
		try {
			email = atobUnicode($page.query.get('e'))
			// eslint-disable-next-line no-empty
		} catch (_) {}

	});
</script>

<svelte:head>
	<title>Launcher - Authentication Error</title>
</svelte:head>
<h1 class="mt-12 mb-10">Authentication Error</h1>
<div class="my-6 text-center">
	We couldn't find a Launcher account associated with your email address
</div>
{#if email}
	<div class="my-6 text-2xl text-center">
		{email}
	</div>
{/if}
<div class="my-6 text-center">
	If you already have a Launcher account, head to <a href="/sign-in">the sign-in page</a> and try again with the email associated with your Launcher account.
</div>
<div class="my-6 text-center">
	Otherwise, you can <a href="/pricing">get started with a free account</a>.
</div>
