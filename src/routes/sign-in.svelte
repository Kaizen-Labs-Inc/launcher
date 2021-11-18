<script context="module" lang="ts">
	export const prerender = true;
	import { goto } from '$app/navigation';
	import IconGoogle from '../components/icons/icon-google.svelte';
</script>

<svelte:head>
	<title>Springboard - Sign in</title>
</svelte:head>
<div class="container mx-auto flex items-center justify-center text-center">
	<div
		on:click={() => {
			goto('/api/auth/signin/google');
		}}
		class="rounded px-3 py-2 text-xl bg-white flex items-center justify-center text-black cursor-pointer mt-24 no-underline"
	>
		<IconGoogle size={24} />
		<div class="ml-4 no-underline">Sign in with Google</div>
	</div>
</div>
