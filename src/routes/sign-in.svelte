<script>
	import PublicNav from '../components/nav/PublicNav.svelte';
	import SignInWithGoogleButton from '../components/SignInWithGoogleButton.svelte';
</script>

<PublicNav />
<div class="items-center mt-24">
	<h1 class="mb-10">👋 Hello there</h1>
	<div class="flex items-center justify-center mx-auto">
		<SignInWithGoogleButton />
		<a
			href="/pricing"
			class="ml-8 opacity-50 hover:opacity-100 text-lg no-underline hover:no-underline bg-white bg-opacity-20 hover:bg-opacity-30 rounded px-4 py-2"
			>or sign up for a free trial</a
		>
	</div>
</div>
