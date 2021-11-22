<script lang="ts">
	import { logout } from '$lib/logout';
</script>

<nav class="mt-4">
	<ul class="flex flex-row justify-center items-center text-gray-400">
		<li class="cursor-pointer mr-6 hover:text-white">Invite someone</li>
		<li class="cursor-pointer mr-6 hover:text-white">Kaizen Labs</li>
		<li class="cursor-pointer mr-6 hover:text-white"><a href="/user">You</a></li>
		<li on:click={logout} class="cursor-pointer mr-6 hover:text-white">Sign out</li>
	</ul>
</nav>

<style>
	nav a {
		text-decoration: none;
	}
</style>
