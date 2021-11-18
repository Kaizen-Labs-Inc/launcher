<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Toasts from '../components/Toasts.svelte';
	import { logout } from '$lib/logout';
	import { userStore } from '../stores/userStore';
	import GoogleUser from '../model/api/GoogleUser';

	let user;
	userStore.subscribe((value) => {
		user = value;
	});

	let loading = true;
	onMount(async () => {
		await userStore.subscribe(value => {
			if (!value && loading) {
				fetch("/api/auth/session").then(res => {
					if (res.status === 200) {
						res.json().then((s: any) => {
							if (s.session?.user?.connections?.google) {
								userStore.set(s.session.user.connections.google as GoogleUser)
							}
						})
					}
				})
			}
			user = value
		});

		loading = false;
	});
</script>

<main>
	<Toasts />

	{#if loading}
		<div class="absolute flex items-center justify-center">Loading...</div>
	{:else}
		<div in:fade>
			<nav class="mt-4">
				<ul class="flex flex-row justify-end text-gray-400">
					<li class="cursor-pointer mr-6 hover:text-white">Invite someone</li>
					<li class="cursor-pointer mr-6 hover:text-white">Kaizen Labs</li>
					{#if user}
						<li class="cursor-pointer mr-6 hover:text-white"><a href="/user">You</a></li>
						<li on:click={logout} class="cursor-pointer mr-6 hover:text-white">Sign out</li>
					{:else}
						<li class="cursor-pointer mr-6 hover:text-white">
							<a href="/sign-in" class="">Sign in </a>
						</li>
					{/if}
				</ul>
			</nav>
			<slot />
		</div>
	{/if}
</main>

<!-- <footer style="opacity-50 hover:opacity-100">
	<p class="mx-3">Springboard 2021</p>
	<a href="#" class="mx-3">Privacy policy</a>
	<a href="#" class="mx-3">Terms of use</a>
</footer> -->
<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}
	nav a {
		text-decoration: none;
	}
	footer {
		display: flex;

		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
