<script lang="ts">
	import { onMount } from 'svelte';
	import { logout } from '$lib/logout';
	import { userStore } from '../../stores/userStore';
	import checkValueAndRedirect from '$lib/checkUserAndRedirect';

	let user;
	userStore.subscribe((value) => {
		checkValueAndRedirect(value);
		user = value.user;
	});

	onMount(() => {
		analytics.page();
	});
</script>

<svelte:head>
	<title>Launcher - You</title>
</svelte:head>

{#if user}
	<div class="flex flex-col justify-center items-center mt-16">
		<img src={user.picture} alt="Profile pic" class="rounded-full" />
		<div class="mt-4 text-xl">{user.name}</div>
		<div class="opacity-50 mt-1">{user.email}</div>
		<div
			on:click={logout}
			class="rounded px-4 py-1 text-lg bg-white flex items-center justify-center text-black cursor-pointer mt-4"
		>
			Sign out
		</div>
	</div>
{/if}
