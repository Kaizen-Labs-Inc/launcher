<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Toasts from '../components/Toasts.svelte';
	import { userStore } from '../stores/userStore';
	import type GoogleUser from '../model/api/GoogleUser';
	import LoadingIndicator from '../components/LoadingIndicator.svelte';
	import { goto } from '$app/navigation';
	import AuthenticatedNav from '../components/nav/AuthenticatedNav.svelte';
	import PublicNav from '../components/nav/PublicNav.svelte';

	let user;
	userStore.subscribe((value) => {
		user = value;
	});

	let loading: boolean = true;

	onMount(async () => {
		await userStore.subscribe((value) => {
			if (!value && loading) {
				fetch('/api/auth/session').then((res) => {
					if (res.status === 200) {
						res.json().then((s: any) => {
							if (s.session?.user?.connections?.google) {
								userStore.set(s.session.user.connections.google as GoogleUser);
							}
						});
					}
				});
			}
			user = value;
			// if (user && !user.workspaceId) { // comment out this logic for now
			// goto('/welcome'); // user is logged-in but hasn't completed team onboarding
			// TODO allow free users to bypass this logic
			// }
		});
		loading = false;
	});
</script>

<main>
	<div class="container">
		<Toasts />
		{#if loading}
			<!-- hardcode some styles so that there is no flash before tailwind classes are loaded -->
			<div
				style="height: 100vh; margin-right: auto; margin-left: auto; display: flex; align-items: center; justify-content: center"
			>
				<LoadingIndicator />
			</div>
		{:else}
			<div in:fade>
				{#if user}
					<AuthenticatedNav />
				{:else}
					<PublicNav />
				{/if}
				<slot />
			</div>
		{/if}
	</div>
</main>

<footer class="opacity-50 hover:opacity-100">
	<p class="mx-3">Kaizen Labs Inc 2021</p>
	<a href="/privacy" class="mx-3">Privacy policy</a>
	<a href="/terms" class="mx-3">Terms of use</a>
</footer>

<style>
	.container {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}
	footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 180px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
