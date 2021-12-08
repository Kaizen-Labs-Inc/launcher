<script>
	import checkUserAndRedirect from '$lib/checkUserAndRedirect';
	import { userStore } from '../stores/userStore';
	import { onMount } from 'svelte';
	import { UserPlusIcon } from 'svelte-feather-icons';
	import InviteForm from '../components/InviteForm.svelte';

	let user;
	userStore.subscribe((value) => {
		checkUserAndRedirect(value);
		user = value.user;
	});

	onMount(() => {
		window.analytics.page();
	});
</script>

{#if user}
	<div
		class="rounded-xl w-20 h-20 mt-24 mx-auto flex items-center justify-center text-black bg-gradient-to-b from-yellow-300 to-green-100 "
	>
		<UserPlusIcon size="38" strokeWidth="1.5" />
	</div>
	<h1 class="mt-8 text-4xl font-medium text-center">Invite your team</h1>
	<h2 class="mt-8 opacity-75 text-2xl text-center">
		Enter your team's email addresses and we'll invite them.
	</h2>
	<InviteForm />
{/if}
