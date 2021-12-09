<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { logout } from '$lib/logout';
	import { GoogleProfile } from 'sk-auth/providers';
	import Organization from '../../model/Organization';

	export let user: GoogleProfile;
	export let organization: Organization;
</script>

<nav class="mt-4">
	<ul class="flex flex-row justify-center items-center flex-wrap">
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
				class="cursor-pointer mr-6 hover:opacity-100 {$page.path === '/workspace'
					? 'opacity-100'
					: 'opacity-60'}"
			>
				{organization.name}
			</li>
		{/if}
		<li
			class="cursor-pointer mr-6 hover:opacity-100 {$page.path === '/user'
				? 'opacity-100'
				: 'opacity-60'}"
		>
			<a href="/user">You</a>
		</li>
		<li on:click={logout} class="cursor-pointer mr-6 hover:opacity-100 opacity-40">Sign out</li>
	</ul>
</nav>

<style>
	nav a {
		text-decoration: none;
	}
</style>
