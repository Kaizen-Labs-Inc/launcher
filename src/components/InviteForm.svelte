<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { sampleWorkspace } from '../model/Workspace';
	import { PlusCircleIcon, Trash2Icon } from 'svelte-feather-icons';
	import Button from './Button.svelte';
	export let inviteFieldCount: number = 3;
	const dispatch = createEventDispatcher();

	let loading: boolean = false;

	const incrementFieldCount = () => {
		inviteFieldCount += 1;
	};
	const handleInvite = async () => {
		loading = true;
		setTimeout(function () {
			loading = false;
			dispatch('success');
		}, 2000);
	};
</script>

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
			{#if i > inviteFieldCount - 2 && i > 0}
				<div
					on:click={() => {
						inviteFieldCount -= 1;
					}}
					class="cursor-pointer opacity-70 hover:opacity-100 p-2 mt-5 ml-1"
				>
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
	<a href="/home" class="mt-6 opacity-60 hover:opacity-100 mx-auto">Skip this for now →</a>
</div>
