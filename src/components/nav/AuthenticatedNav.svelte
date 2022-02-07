<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { logout } from '$lib/logout';
	import Organization from '../../model/Organization';
	import { variables } from '../../lib/env';

	export let organization: Organization;
	let externalLinks = [];

	try {
		externalLinks = JSON.parse(variables.externalHeaderLinks)
		// eslint-disable-next-line no-empty
	} catch (_) {}

</script>

<nav
	role="navigation"
	class="p-2 flex w-full backdrop-blur-lg bg-white bg-opacity-5 h-14 items-center justify-start"
>
	<ul class="flex flex-row items-center flex-wrap container mx-auto">
		<li class="cursor-pointer mr-8 opacity-100">
			<a href="/home" class="flex items-center"
				><img src="favicon-32x32.png" class="w-4 h-4 mr-1" alt="Logo" />Home</a
			>
		</li>
		<li class="flex-grow" />
		{#each externalLinks as externalLink}
			<li
				on:click={() => {
					goto(externalLink.url);
				}}
				class="cursor-pointer mr-8 hover:opacity-100 opacity-60"
			>
				{externalLink.label}
			</li>
		{/each}
		<li
			class="cursor-pointer mr-8 hover:opacity-100 {$page.path === '/user'
				? 'opacity-100'
				: 'opacity-60'}"
		>
			<a href="/user">You</a>
		</li>

		<li
			on:click={logout}
			class="cursor-pointer bg-white bg-opacity-5 hover:bg-opacity-10 shadow py-2 px-3 rounded-lg text-sm font-medium"
		>
			Sign out
		</li>
	</ul>
</nav>

<style>
	nav a {
		text-decoration: none;
	}
</style>
