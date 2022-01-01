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
	<a href="/"><img src="icon.png" alt="Launcher logo" class="w-32 h-32 mb-8" /></a>
	<SignInWithGoogleButton />
	<a href="/pricing" class="mt-8 text-2xl opacity-75 hover:opacity-100">or sign up</a>
</div>
