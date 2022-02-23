<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import atobUnicode from '../lib/atobUnicode';

	let email;
	let signup;
	let slug;
	let message;

	onMount(() => {
		analytics.page();
		try {
			const encodedEmail = $page.query.get('e');
			if (encodedEmail) {
				email = atobUnicode(encodedEmail);
			}
			const encodedInvitationSlug = $page.query.get('i');
			if (encodedInvitationSlug) {
				slug = atobUnicode(encodedInvitationSlug);
			}

			const encodedMessage = $page.query.get('m');
			if (encodedMessage) {
				message = atobUnicode(encodedMessage);
			}
			signup = $page.query.get('s');
			// eslint-disable-next-line no-empty
		} catch (_) {}
	});
</script>

<svelte:head>
	<title>Launcher - Authentication Error</title>
</svelte:head>
<h1 class="mt-12 mb-10">Authentication Error</h1>
{#if email}
	<div class="my-6 text-2xl text-center">
		We couldn't find a Launcher account associated with {email}
	</div>
	<div class="my-6 text-center">
		If you already have a Launcher account, head to <a href="/sign-in">the sign-in page</a> and try again.
	</div>
	<div class="my-6 text-center">
		Otherwise, you can <a href="/pricing">get started with a free account</a>.
	</div>
{/if}
{#if signup}
	<div class="my-6 text-2xl text-center">We couldn't create your account.</div>
	<div class="my-6 text-center">
		If you already have a Launcher account, try <a href="/sign-in">signing in</a>.
	</div>
	<div class="my-6 text-center">
		Otherwise, you can <a href="/pricing">get started with a free account</a>.
	</div>
{/if}
{#if slug}
	<div class="my-6 text-2xl text-center">
		We couldn't find an invitation with the code {slug}
	</div>
	<div class="my-6 text-center">Please check your invitation link and try again.</div>
	<div class="my-6 text-center">
		Otherwise, you can <a href="/pricing">get started with a free account</a>.
	</div>
{/if}
{#if message}
	<div class="my-6 text-2xl text-center">An error occurred</div>
	<div class="my-6 text-center">
		{message}
	</div>
{/if}
{#if !email && !signup && !slug}
	<div class="my-6 text-2xl text-center">
		There was a problem authenticating you. Our team has been notified.
	</div>
	<div class="my-6 text-center">
		<a href="/">Go to Launcher home</a>
	</div>
{/if}
