<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let loading = true;
	let invitation;

	onMount(() => {
		window.analytics.page();
		fetch(`/api/invitation/${encodeURIComponent($page.params.slug)}`)
			.then(res => {
				res.json().then(data => {
					invitation = data
					loading = false
				})
			})
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
			class="items-center justify-center"
		>
			<div>You've been invited to join Launcher</div>
			<div>{invitation.inviteeEmail}</div>
		</div>
	{/if}
{/if}
