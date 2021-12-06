<script>
	import SignInWithGoogleButton from '../components/SignInWithGoogleButton.svelte';
</script>

<div class="flex flex-col items-center mt-12">
	<h1 class="mb-10">👋 Hello there</h1>
	<SignInWithGoogleButton />
	<a
		href="/pricing"
		class="mt-8 opacity-50 hover:opacity-100 text-lg no-underline hover:no-underline bg-white bg-opacity-20 hover:bg-opacity-30 rounded px-4 py-2"
		>or sign up for a free trial</a
	>
</div>
