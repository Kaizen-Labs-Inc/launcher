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
			if (user) {
				goto('/home');
			}
		});
		loading = false;

		if (user) {
			goto('/home');
		}
	});
</script>

<main>
	<div class="container">
		<Toasts />
		{#if loading}
			<!-- hardcode some styles so that there is no flash before tailwind classes are loaded -->
			<div style="height: 100vh; margin-right: auto; margin-left: auto; display: flex; align-items: center; justify-content: center"><LoadingIndicator /></div>
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
