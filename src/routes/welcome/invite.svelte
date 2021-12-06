<script lang="ts">
	import { userStore } from '../../stores/userStore';
	import { addToast } from '../../stores/toaststore';

	import { sampleWorkspace } from '../../model/Workspace';
	import { UserPlusIcon } from 'svelte-feather-icons';
	import InviteForm from '../../components/InviteForm.svelte';
	import { goto } from '$app/navigation';
	const handleSuccess = () => {
		addToast({ dismissible: false, message: '👍 Invites sent', type: 'success', timeout: 2000 });
		goto('/home');
	};
</script>

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
