<!-- TODO update this route to [id].svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { organizationStore } from '../../../stores/organizationStore';
	import Organization from '../../../model/Organization';
	import { scale } from 'svelte/transition';
	import { clickOutside } from '../../../utils/DetectClickOutsideOfElement';
	import Button from '../../../components/Button.svelte';
	import { goto } from '$app/navigation';

	let organization: Organization;
	let memberListVisible: boolean = false;
	let billingModalVisible: boolean = false;

	organizationStore.subscribe((value) => {
		organization = value.organization;
	});

	const clickOutsideFilter = (node: Node) => {
		//
	};

	onMount(() => {
		window.analytics.page();
		document.addEventListener(
			'keydown',
			(event) => {
				if ((memberListVisible || billingModalVisible) && event.key === 'Escape') {
					memberListVisible = false;
					billingModalVisible = false;
				}
			},
			false
		);
	});
</script>

<svelte:head>
	<title>Launcher - Edit team</title>
</svelte:head>
{#if organization}
	{#if billingModalVisible}
		<div
			transition:scale={{ duration: 200, opacity: 0, start: 0.9 }}
			use:clickOutside={{
				exclusionFilter: clickOutsideFilter
			}}
			on:clickOutside={() => {
				billingModalVisible = false;
			}}
			style="left: 50%;
		transform: translateX(-50%);"
			class="p-4 mt-16 max-h-screen overflow-scroll scroll-smooth bg-white bg-opacity-10 backdrop-blur-2xl shadow-2xl rounded-xl absolute w-full sm:w-2/3 md:w-1/3 z-50"
		>
			<h2 class="font-medium text-xl">Update payment details</h2>
			<Button
				label="Save"
				on:clicked={() => {
					billingModalVisible = false;
				}}
			/>
		</div>
	{/if}
	{#if memberListVisible}
		<div
			transition:scale={{ duration: 200, opacity: 0, start: 0.9 }}
			use:clickOutside={{
				exclusionFilter: clickOutsideFilter
			}}
			on:clickOutside={() => {
				memberListVisible = false;
			}}
			style="left: 50%;
		transform: translateX(-50%);"
			class="p-4 mt-16 max-h-screen overflow-scroll scroll-smooth bg-white bg-opacity-10 backdrop-blur-2xl shadow-2xl rounded-xl absolute w-full sm:w-2/3 md:w-1/3 z-50"
		>
			<div class="flex flex-row justify-between items-center my-6">
				<div class="flex items-center">
					<div class="rounded-full bg-gray-300 w-8 h-8 mr-2" />
					<div class="font-medium text-lg">You</div>
					<div class="opacity-60 text-sm ml-3">Joined 12 days ago</div>
				</div>

				<div
					on:click={() => {
						if (window.confirm('Are you sure?')) {
							// TODO delete user
						}
					}}
					class="rounded-full cursor-pointer flex items-center justify-center px-3 py-1 bg-red-400 hover:bg-red-500 text-white font-medium"
				>
					Delete
				</div>
			</div>
		</div>
	{/if}
	<div class="flex flex-col justify-center items-center mt-16">
		<div class="mt-4 text-xl">{organization.name}</div>
		{#if organization.emailDomains}
			{#each organization.emailDomains as domain}
				<div class="opacity-50 mt-1">{domain.domain}</div>
			{/each}
		{/if}
	</div>
	<div class="w-full sm:w-2/3 md:w-1/2 mt-12 mx-auto text-lg">
		<div class="flex flex-row justify-between items-center my-6">
			<div>Your team</div>
			<div>
				<input class="text-black rounded px-2 py-1" type="text" bind:value={organization.name} />
			</div>
		</div>
		{#if organization.domainRestricted}
			<div class="flex flex-row justify-between items-center my-6">
				<div>{organization.emailDomains.length > 1 ? 'Primary domains' : 'Primary domain'}</div>
				<div>
					{#each organization.emailDomains as domain, i}
						<input class="text-black rounded px-2 py-1" type="text" bind:value={domain.domain} />
					{/each}
				</div>
			</div>

			<div class="flex flex-row justify-between items-center my-6">
				<div class="text-base">
					Restrict sign-ups to those with a <span class="font-medium"
						>{organization.emailDomains[0].domain}</span
					> email
				</div>
				<input type="checkbox" checked={organization.domainRestricted} />
			</div>
		{/if}
		<div class="flex flex-row justify-between items-center my-6">
			<div>Your plan</div>
			<!-- TODO update this to show the plan details -->
			<div>{organization.subscriptionId}</div>
		</div>
		<div class="flex flex-row justify-between items-center my-6">
			<div>Team members</div>
			<div class="flex items-center">
				<div
					on:click={() => {
						memberListVisible = true;
					}}
					class="rounded-full bg-white bg-opacity-10 px-3 py-1 text-base hover:bg-opacity-20 cursor-pointer"
				>
					8 members
				</div>
			</div>
		</div>
		<div class="flex flex-row justify-between items-center my-6">
			<div>Billing</div>
			<!-- TODO update this to only show to admins -->
			<div class="flex items-center">
				<div>Visa ending in 1234</div>
				<div
					on:click={() => {
						billingModalVisible = true;
					}}
					class="ml-3 rounded-full bg-white bg-opacity-10 px-3 py-1 text-base hover:bg-opacity-20 cursor-pointer"
				>
					Update
				</div>
			</div>
		</div>

		<div class="flex flex-row justify-between items-center my-6">
			<div>Billing contact</div>
			<div class="flex flex-col items-end">
				<div>
					<input class="text-black rounded px-2 py-1" type="email" value="jordan@kaizenlabs.dev" />
				</div>
				<div class="text-sm opacity-60 mt-1">Invoices will be sent here</div>
			</div>
		</div>
		<Button
			label="Save"
			on:clicked={() => {
				alert('Saved!');
				goto(`/workspace/${organization.id}`);
			}}
		/>
	</div>
{/if}
