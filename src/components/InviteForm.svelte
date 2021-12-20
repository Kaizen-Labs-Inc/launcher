<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { PlusCircleIcon, Trash2Icon } from 'svelte-feather-icons';
	import Button from './Button.svelte';
	import Organization from '../model/Organization';
	const dispatch = createEventDispatcher();

	let loading = false;
	export let organization: Organization;
	const domain = organization?.emailDomains?.find((_) => true)?.domain;

	let invites = [{ inviteeEmail: '' }, { inviteeEmail: '' }, { inviteeEmail: '' }];

	const addInvite = () => {
		invites = [...invites, { inviteeEmail: '' }];
	};
	const destroyLastInvite = () => {
		invites.pop();
		invites = invites;
	};
	const handleInvite = async () => {
		loading = true;
		let data = invites.filter((it) => it.inviteeEmail.trim() !== '');
		if (organization) {
			data = data.map((it) => Object.assign(it, { organizationId: organization.id }));
		}
		fetch(`/api/invitation`, {
			method: 'POST',
			body: JSON.stringify(data)
		}).then((res) => {
			if (res.status === 201) {
				loading = false;
				dispatch('success');
			} else {
				dispatch('failure');
			}
		});
	};
</script>

<div class="flex flex-col mt-12 mx-auto w-full sm:w-2/3">
	{#each invites as invite, i}
		<div in:fly={{ duration: 200, y: 20, opacity: 0 }} class="flex items-center">
			<div class="flex flex-col justify-start my-3 flex-grow">
				<label class="mb-1" for="workspaceName">Invite someone by email</label>
				<input
					bind:value={invite.inviteeEmail}
					name="workspaceName"
					type="text"
					autofocus={i === 0}
					required
					placeholder="name@{domain || 'example.com'}"
					class="bg-white bg-opacity-10 rounded p-2 outline-none text-xl"
				/>
			</div>
			{#if i === invites.length - 1 && i > 0}
				<div
					on:click={destroyLastInvite}
					class="cursor-pointer opacity-70 hover:opacity-100 p-2 mt-5 ml-1"
				>
					<Trash2Icon size="20" strokeWidth="1" />
				</div>
			{/if}
		</div>
	{/each}
	<div
		on:click={addInvite}
		class="flex items-center justify-start p-3 my-4 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 cursor-pointer text-lg"
	>
		<PlusCircleIcon size="20" strokeWidth="1" />
		<div class="ml-4">Add another email address</div>
	</div>
	<Button label="Send invites" on:clicked={handleInvite} disabled={loading} />
	{#if loading}
		<div class="mt-6 opacity-60 hover:opacity-100 mx-auto">Sending invites...</div>
	{:else}
		<a href="/home" class="mt-6 opacity-60 hover:opacity-100 mx-auto">Skip this for now →</a>
	{/if}
</div>
