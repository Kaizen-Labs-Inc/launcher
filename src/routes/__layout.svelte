<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Toasts from '../components/Toasts.svelte';
	import { UserStatus, userStore } from '../stores/userStore';
	import type GoogleUser from '../model/api/GoogleUser';
	import LoadingIndicator from '../components/LoadingIndicator.svelte';
	import { variables } from '$lib/env';
	import AuthenticatedNav from '../components/nav/AuthenticatedNav.svelte';
	import PublicNav from '../components/nav/PublicNav.svelte';
	import { OrganizationStatus, organizationStore } from '../stores/organizationStore';
	import { Gradient } from '$lib/gradient';

	let userStatus: UserStatus;

	userStore.subscribe((value) => {
		userStatus = value;
	});
	let organizationStatus: OrganizationStatus;

	organizationStore.subscribe((value) => {
		organizationStatus = value;
	});
	const gradient = new Gradient();

	onMount(async () => {
		const analytics = (window.analytics = window.analytics || []);
		gradient.initGradient('#gradient-canvas');
		gradient.amp = 200;

		if (!analytics.initialize)
			if (analytics.invoked)
				window.console && console.error && console.error('Segment snippet included twice.');
			else {
				analytics.invoked = !0;
				analytics.methods = [
					'trackSubmit',
					'trackClick',
					'trackLink',
					'trackForm',
					'pageview',
					'identify',
					'reset',
					'group',
					'track',
					'ready',
					'alias',
					'debug',
					'page',
					'once',
					'off',
					'on',
					'addSourceMiddleware',
					'addIntegrationMiddleware',
					'setAnonymousId',
					'addDestinationMiddleware'
				];
				analytics.factory = function (e) {
					return function () {
						const t = Array.prototype.slice.call(arguments);
						t.unshift(e);
						analytics.push(t);
						return analytics;
					};
				};
				for (let e = 0; e < analytics.methods.length; e++) {
					const key = analytics.methods[e];
					analytics[key] = analytics.factory(key);
				}
				analytics.load = function (key, e) {
					const t = document.createElement('script');
					t.type = 'text/javascript';
					t.async = !0;
					t.src = 'https://cdn.segment.com/analytics.js/v1/' + key + '/analytics.min.js';
					const n = document.getElementsByTagName('script')[0];
					n.parentNode.insertBefore(t, n);
					analytics._loadOptions = e;
				};
				analytics._writeKey = variables.segmentKey;
				analytics.SNIPPET_VERSION = '4.15.3';
				analytics.load(variables.segmentKey);
			}

		userStore.subscribe((value) => {
			if (value.loading) {
				fetch('/api/auth/session')
					.then((res) => {
						if (res.status === 200) {
							res.json().then((s: any) => {
								userStore.set({
									loading: false,
									user: s?.session?.user?.connections?.google as GoogleUser
								});
							});
						} else {
							userStore.set({ loading: false, user: undefined });
						}
					})
					.catch((e) => {
						console.error(e.message);
						userStore.set({ loading: false, user: undefined });
					});
			}
		});

		organizationStore.subscribe((value) => {
			if (value.loading) {
				fetch('/api/organization')
					.then((res) => {
						if (res.status === 200) {
							res.json().then((org: any) => {
								organizationStore.set({
									loading: false,
									organization: org
								});
							});
						} else {
							organizationStore.set({ loading: false, organization: undefined });
						}
					})
					.catch((e) => {
						console.error(e.message);
						organizationStore.set({ loading: false, organization: undefined });
					});
			}
		});
	});
</script>

<main class="z-10">
	<div class="container">
		<Toasts />
		{#if userStatus.loading || organizationStatus.loading}
			<!-- hardcode some styles so that there is no flash before tailwind classes are loaded -->
			<div
				style="height: 100vh; margin-right: auto; margin-left: auto; display: flex; align-items: center; justify-content: center"
			>
				<LoadingIndicator />
			</div>
		{:else}
			<div in:fade>
				{#if userStatus.user}
					<AuthenticatedNav user={userStatus.user} organization={organizationStatus.organization} />
				{:else}
					<PublicNav />
				{/if}
				<slot />
			</div>
		{/if}
	</div>
</main>
<canvas id="gradient-canvas" style="width: 100vw; height: 100vh; position: absolute; z-index: 0" />

<!-- <footer class="z-0">
	<p class="mx-3">Kaizen Labs Inc 2021</p>
	<a href="/privacy" class="mx-3">Privacy policy</a>
	<a href="/terms" class="mx-3">Terms of use</a>
</footer> -->
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

	#gradient-canvas {
		--gradient-color-1: #000;
		--gradient-color-2: #243aff;
		--gradient-color-3: #9fffa1;
		--gradient-color-4: #e63946;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
