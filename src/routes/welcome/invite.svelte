<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../../components/Button.svelte';
	import type GoogleUser from '../../model/api/GoogleUser';
	import { userStore } from '../../stores/userStore';
	import type Workspace from '../../model/Workspace';
	import { sampleWorkspace } from '../../model/Workspace';
	import AuthenticatedNav from '../../components/nav/AuthenticatedNav.svelte';
	import { PlusCircleIcon, Trash2Icon } from 'svelte-feather-icons';
	let user: GoogleUser;
	let inviteFieldCount: number = 3;
	let loading: boolean = false;
	const handleInvite = async () => {
		loading = true;
	};
	userStore.subscribe((value) => {
		user = value;
	});
	const incrementFieldCount = () => {
		inviteFieldCount += 1;
	};
</script>

<AuthenticatedNav />
<h1 class="mt-24 text-4xl font-medium text-center">Invite {sampleWorkspace.name}</h1>
<h2 class="mt-8 opacity-75 text-2xl text-center">
	Launcher works best for your entire team.<br /> Enter your team's email addresses and we'll invite
	them.
</h2>
<div class="flex flex-col mt-12 mx-auto w-full sm:w-2/3">
	{#each Array(inviteFieldCount) as _, i}
		<div class="flex items-center">
			<div class="flex flex-col justify-start my-3 flex-grow">
				<label class="mb-1" for="workspaceName">Invite someone by email</label>
				<input
					name="workspaceName"
					type="text"
					autofocus={i === 0}
					required
					placeholder="name@{sampleWorkspace.domain}"
					class="bg-white bg-opacity-10 rounded p-2 outline-none text-xl"
				/>
			</div>
			{#if i > 2}
				<div class="cursor-pointer opacity-70 hover:opacity-100 p-2 mt-5 ml-1">
					<Trash2Icon size="20" strokeWidth="1" />
				</div>
			{/if}
		</div>
	{/each}
	<div
		on:click={incrementFieldCount}
		class="flex items-center justify-start p-3 my-4 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 cursor-pointer text-lg"
	>
		<PlusCircleIcon size="20" strokeWidth="1" />
		<div class="ml-4">Add another email address</div>
	</div>
	<Button label="Send invites" on:clicked={handleInvite} disabled={loading} />
</div>
