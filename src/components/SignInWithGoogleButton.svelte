<script lang="ts">
	import { goto } from '$app/navigation';
	import IconGoogle from './icons/icon-google.svelte';

	export let link = `/api/auth/signin/google?redirect=${encodeURIComponent("/api/do/" + btoa(JSON.stringify({ type: 0 })))}`
	export let label = 'Sign in with Google'
</script>

<div
	on:click={() => {
		analytics.track('Sign-in button clicked', {
			provider: 'Google'
		});
		goto(link);
	}}
	class="rounded px-3 py-2 text-2xl bg-white flex items-center justify-center text-black cursor-pointer no-underline"
>
	<IconGoogle size={24} />
	<div class="ml-4 no-underline">{label}</div>
</div>
