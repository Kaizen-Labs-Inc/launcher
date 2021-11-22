<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Toasts from '../components/Toasts.svelte';
	import { userStore } from '../stores/userStore';
	import type GoogleUser from '../model/api/GoogleUser';
	import LoadingIndicator from '../components/LoadingIndicator.svelte';
	import { goto } from '$app/navigation';

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

		// TODO this is not redirecting
		if ($user) {
			goto('/home');
		}
	});
</script>

<main class="landing h-screen">
	<div class="container">
		<Toasts />
		{#if loading}
			<!-- TODO this loading state isn't rendering the CSS so it's janky -->
			<div class="flex items-center h-screen mx-auto justify-center"><LoadingIndicator /></div>
		{:else}
			<div in:fade>
				<slot />
			</div>
		{/if}
	</div>
</main>

<footer style="opacity-50 hover:opacity-100">
	<p class="mx-3">Springboard 2021</p>
	<a href="#" class="mx-3">Privacy policy</a>
	<a href="#" class="mx-3">Terms of use</a>
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
	.landing {
		background-color: #0b1431;
		background-image: #0b1431;
		background-image: radial-gradient(at 0% 50%, hsla(233, 45%, 30%, 1) 0, transparent 100%),
			radial-gradient(at 0% 100%, hsla(127, 93%, 67%, 1) 0, transparent 50%),
			radial-gradient(at 80% 100%, hsla(242, 100%, 70%, 1) 0, transparent 50%),
			radial-gradient(at 0% 0%, hsla(229, 100%, 51%, 1) 0, transparent 50%);
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
