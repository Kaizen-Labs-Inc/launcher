<script lang="ts">
	import { onMount } from 'svelte';
	import { logout } from '$lib/logout';
	import checkValueAndRedirect from '$lib/checkUserAndRedirect';
	import { organizationStore } from '../stores/organizationStore';
	import Organization from '../model/Organization';

	let organization: Organization;
	organizationStore.subscribe((value) => {
		organization = value.organization;
	});

	onMount(() => {
		window.analytics.page();
	});
</script>

{#if organization}
	<div class="flex flex-col justify-center items-center mt-16">
		<div class="mt-4 text-xl">{organization.name}</div>
		{#if organization.emailDomains}
			{#each organization.emailDomains as domain}
				<div class="opacity-50 mt-1">{domain.domain}</div>
			{/each}
		{/if}
	</div>
{/if}
