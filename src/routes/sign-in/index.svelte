<script>
	import { onMount } from 'svelte';

	import SignInWithGoogleButton from '../../components/SignInWithGoogleButton.svelte';

	onMount(() => {
		window.analytics.page();
	});
</script>

<svelte:head>
	<title>Launcher - Sign in</title>
</svelte:head>

<div class="flex flex-col items-center mt-16">
	<a href="/"><img src="/icon.png" alt="Launcher logo" class="w-32 h-32 mb-8" /></a>
	<SignInWithGoogleButton />
	<div class="mt-8 text-2xl opacity-75">
		New to Launcher? <a href="/api/auth/signin/google?type=1" class="hover:opacity-100">Sign up</a>
	</div>
</div>
