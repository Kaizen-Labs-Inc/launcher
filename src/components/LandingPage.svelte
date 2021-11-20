<script>
	import SignInWithGoogleButton from './SignInWithGoogleButton.svelte';
</script>

<div class="container">
	<nav class="flex w-full justify-end">
		<a href="/sign-in" class="opacity-50 hover:opacity-100 no-underline">Sign in</a>
	</nav>
	<div class="text-center">
		<div class="uppercase text-xl opacity-50 mt-24 mb-4">Springboard</div>
		<h1 class="text-6xl font-medium">The launcher app for your growing team.</h1>
	</div>
	<div class="flex justify-center">
		<SignInWithGoogleButton />
	</div>
</div>

<style>
	h1 {
		background: #2980b9; /* fallback for old browsers */
		background: -webkit-linear-gradient(
			to right,
			#ffffff,
			#6dd5fa,
			#2980b9
		); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to right,
			#ffffff,
			#6dd5fa,
			#2980b9
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
