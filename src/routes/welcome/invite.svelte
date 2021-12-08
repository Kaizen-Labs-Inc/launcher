<script lang="ts">
	import { onMount } from 'svelte';
	import { addToast } from '../../stores/toaststore';

	import { sampleWorkspace } from '../../model/Workspace';
	import { UserPlusIcon } from 'svelte-feather-icons';
	import InviteForm from '../../components/InviteForm.svelte';
	import { goto } from '$app/navigation';
	import { userStore } from '../../stores/userStore';
	import checkUserAndRedirect from '$lib/checkUserAndRedirect';

	let user;
	userStore.subscribe((value) => {
		checkUserAndRedirect(value);
		user = value.user;
	});

	const handleSuccess = () => {
		addToast({ dismissible: false, message: '👍 Invites sent', type: 'success', timeout: 2000 });
		goto('/home');
	};

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
	<h1 class="mt-8 text-4xl font-medium text-center">Invite {sampleWorkspace.name}</h1>
	<h2 class="mt-8 opacity-75 text-2xl text-center">
		Launcher works best for your entire team.<br /> Enter your team's email addresses and we'll invite
		them.
	</h2>
	<InviteForm on:success={handleSuccess} />
{/if}
