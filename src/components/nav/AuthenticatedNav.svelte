<script lang="ts">
	import { page } from '$app/stores';

	import { logout } from '$lib/logout';
</script>

<nav class="mt-4">
	<ul class="flex flex-row justify-center items-cente">
		<li
			class="cursor-pointer mr-6 hover:opacity-100 {$page.path === '/home'
				? 'opacity-100'
				: 'opacity-60'}"
		>
			<a href="/home" class="flex items-center"
				><img src="favicon-32x32.png" class="w-4 h-4 mr-1" alt="Logo" />Home</a
			>
		</li>
		<li
			class="cursor-pointer mr-6 hover:opacity-100 {$page.path === '/invite'
				? 'opacity-100'
				: 'opacity-60'}"
		>
			Invite someone
		</li>
		<li
			class="cursor-pointer mr-6 hover:opacity-100 {$page.path === '/team'
				? 'opacity-100'
				: 'opacity-60'}"
		>
			Kaizen Labs
		</li>
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
