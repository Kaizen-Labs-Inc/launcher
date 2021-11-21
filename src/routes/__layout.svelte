<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Toasts from '../components/Toasts.svelte';
	import { userStore } from '../stores/userStore';
	import type GoogleUser from '../model/api/GoogleUser';
	import LoadingIndicator from '../components/LoadingIndicator.svelte';
	import LandingPage from '../components/LandingPage.svelte'; // TODO should this be a route instead
	import PublicNav from '../components/nav/PublicNav.svelte';
	import AuthenticatedNav from '../components/nav/AuthenticatedNav.svelte';

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
		});

		loading = false;
	});
</script>

<main>
	<Toasts />

	{#if loading}
		<!-- TODO this loading state isn't rendering the CSS so it's janky -->
		<div class="flex items-center h-screen mx-auto justify-center"><LoadingIndicator /></div>
	{:else if !user}
		<div in:fade>
			<PublicNav />
			<LandingPage />
		</div>
	{:else}
		<div in:fade>
			<AuthenticatedNav />
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
