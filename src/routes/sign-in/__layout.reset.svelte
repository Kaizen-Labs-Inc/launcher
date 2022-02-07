<script lang="ts">
	import '../../app.postcss';
	import { onMount } from 'svelte';
	import Toasts from '../../components/Toasts.svelte';
	import { UserStatus, userStore } from '../../stores/userStore';
	import type GoogleUser from '../../model/api/GoogleUser';
	import LoadingIndicator from '../../components/LoadingIndicator.svelte';
	import { variables } from '$lib/env';
	import { backdropStore } from '../../stores/backdropStore';

	import { OrganizationStatus, organizationStore } from '../../stores/organizationStore';
	import { goto } from '$app/navigation';
	let userStatus: UserStatus;

	userStore.subscribe((value) => {
		userStatus = value;
	});
	let organizationStatus: OrganizationStatus;

	organizationStore.subscribe((value) => {
		organizationStatus = value;
	});

	let selectedBackdrop: Backdrop;
	backdropStore.subscribe((value) => {
		selectedBackdrop = value;
	});

	onMount(async () => {
		const analytics = (window.analytics = window.analytics || []);

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
								// goto('/home'); TODO this redirect is firing even when signed out
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

<main
	class="z-10 min-h-screen w-screen transition ease-in-out duration-200 {selectedBackdrop.darkMode
		? 'text-white'
		: 'text-black'}"
	style={selectedBackdrop.colors.length === 1
		? 'background-color: ' + selectedBackdrop.colors[0].value
		: `background-color: #0b1431; background-image: radial-gradient(at 0% 50%, ${selectedBackdrop.colors[0].value} 0, transparent 100%),
radial-gradient(at 0% 100%, ${selectedBackdrop.colors[1].value} 0, transparent 50%),
radial-gradient(at 80% 100%, ${selectedBackdrop.colors[2].value} 0, transparent 50%),
radial-gradient(at 0% 0%, ${selectedBackdrop.colors[3].value} 0, transparent 50%);`}
>
	<div class="flex items-center justify-center text-center">
		<Toasts />
		{#if userStatus.loading || organizationStatus.loading}
			<!-- hardcode some styles so that there is no flash before tailwind classes are loaded -->
			<div
				style="height: 100vh; margin-right: auto; margin-left: auto; display: flex; align-items: center; justify-content: center"
			>
				<LoadingIndicator />
			</div>
		{:else}
			<slot />
		{/if}
	</div>
</main>
