<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import IconGoogle from '../../components/icons/icon-google.svelte';

	let loading = true;
	let invitation;

	const signIn = () => {
		goto('/api/auth/signin/google');
		analytics.track('Sign-in button clicked', {
			provider: 'Google'
		});
	}

	onMount(() => {
		window.analytics.page();
		fetch(`/api/invitation/${encodeURIComponent($page.params.slug)}`)
			.then(res => {
				res.json().then(data => {
					invitation = data;
					loading = false;
				});
			});
	});
</script>

<svelte:head>
	<title>Launcher - Invite your team</title>
</svelte:head>

{#if loading}
	<div
		class="rounded-xl w-20 h-20 mt-24 mx-auto flex items-center justify-center text-black bg-gradient-to-b from-yellow-300 to-green-100 "
	>
		Loading...
	</div>
{:else}
	{#if invitation}
		<div
			class="flex flex-col items-center"
		>
			<h1 class="mt-8 mb-10">👋 Hello there</h1>
			{#if invitation.organization}
				<div class="mt-2 text-2xl">You've been invited to join {invitation.organization.name} on Launcher</div>
			{:else}
				<div class="mt-2 text-2xl">You've been invited to join Launcher</div>
			{/if}
			<div
				on:click={signIn}
				class="rounded mt-8 px-3 py-2 text-xl bg-white flex items-center justify-center text-black cursor-pointer no-underline"
			>
				<IconGoogle size={24} />
				<div class="ml-4 no-underline">Sign up with Google</div>
			</div>
			<div class="m-4 text-lg text-gray-400">{invitation.inviteeEmail}</div>
		</div>
	{/if}
{/if}
