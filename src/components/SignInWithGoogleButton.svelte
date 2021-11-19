<script lang="ts">
	import { goto } from '$app/navigation';
	import IconGoogle from './icons/icon-google.svelte';
</script>

<div
	on:click={() => {
		goto('/api/auth/signin/google');
	}}
	class="rounded px-3 py-2 text-xl bg-white flex items-center justify-center text-black cursor-pointer mt-24 no-underline"
>
	<IconGoogle size={24} />
	<div class="ml-4 no-underline">Sign in with Google</div>
</div>
