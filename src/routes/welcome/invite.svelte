<script lang="ts">
	import { onMount } from 'svelte';
	import { addToast } from '../../stores/toaststore';
	import { UserPlusIcon } from 'svelte-feather-icons';
	import InviteForm from '../../components/InviteForm.svelte';
	import { goto } from '$app/navigation';
	import { userStore } from '../../stores/userStore';
	import { organizationStore } from '../../stores/organizationStore';
	import checkUserAndRedirect from '$lib/checkUserAndRedirect';
	import Organization from '../../model/Organization';

	let user;
	userStore.subscribe((value) => {
		checkUserAndRedirect(value);
		user = value.user;
	});

	let organization: Organization;
	organizationStore.subscribe((value) => {
		organization = value.organization;
	});

	const handleSuccess = () => {
		addToast({ dismissible: false, message: '👍 Invites sent', type: 'success', timeout: 2000 });
		goto('/home');
	};

	onMount(() => {
		window.analytics.page();
	});
</script>

<div
	class="rounded-xl w-20 h-20 mt-24 mx-auto flex items-center justify-center text-black bg-gradient-to-b from-yellow-300 to-green-100 "
>
	<UserPlusIcon size="38" strokeWidth="1.5" />
</div>
{#if organization}
	<h1 class="mt-8 text-4xl font-medium text-center">Invite {organization.name}</h1>
	<h2 class="mt-8 opacity-75 text-2xl text-center">
		Launcher works best for your entire team.<br /> Enter your team's email addresses and we'll invite
		them.
	</h2>
{:else}
	<h1 class="mt-8 text-4xl font-medium text-center">Invite your colleagues, coworkers, or friends</h1>
{/if}
<InviteForm organization={organization} on:success={handleSuccess} />
