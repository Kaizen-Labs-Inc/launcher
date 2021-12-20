<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { logout } from '$lib/logout';
	import { GoogleProfile } from 'sk-auth/providers';
	import Organization from '../../model/Organization';

	export let user: GoogleProfile;
	export let organization: Organization;
</script>

<nav class="p-2 flex w-full backdrop-blur-lg bg-white bg-opacity-5 h-12 items-center justify-start">
	<ul class="flex flex-row items-center flex-wrap container mx-auto">
		<li
			class="cursor-pointer mr-6 hover:opacity-100 {$page.path === '/home'
				? 'opacity-100'
				: 'opacity-60'}"
		>
			<a href="/home" class="flex items-center"
				><img src="favicon-32x32.png" class="w-4 h-4 mr-1" alt="Logo" />Apps</a
			>
		</li>
		<li
			on:click={() => {
				goto('/invite');
			}}
			class="cursor-pointer mr-6 hover:opacity-100 {$page.path === '/invite'
				? 'opacity-100'
				: 'opacity-60'}"
		>
			Invite your team
		</li>
		{#if organization}
			<li
				class="cursor-pointer mr-6 hover:opacity-100 {$page.path === `/workspace/${organization.id}`
					? 'opacity-100'
					: 'opacity-60'}"
			>
				<a href="/workspace/${organization.id}">{organization.name}</a>
			</li>
		{/if}
		<li
			class="cursor-pointer mr-6 hover:opacity-100 {$page.path === '/user'
				? 'opacity-100'
				: 'opacity-60'}"
		>
			<a href="/user">You</a>
		</li>
		<li class="flex-grow" />
		<li
			on:click={logout}
			class="cursor-pointer ml-6 bg-white bg-opacity-5 hover:bg-opacity-10 shadow py-2 px-3 rounded-lg text-sm font-medium"
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
