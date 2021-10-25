<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Auth from '$lib/Auth.svelte';
	import firebase from 'firebase/compat/app';

	let loading = true;
	const firebaseConfig = {
		apiKey: 'AIzaSyAV4OMbmBAmlQXc0HKZYqlN95rmeSH-cAY',
		authDomain: 'springboard-launcher.firebaseapp.com',
		projectId: 'springboard-launcher',
		storageBucket: 'springboard-launcher.appspot.com',
		messagingSenderId: '190518399300',
		appId: '1:190518399300:web:769e8cc7c1b82381f08711',
		measurementId: 'G-7FF7NJNV2R'
	};

	firebase.initializeApp(firebaseConfig);
	onMount(() => {
		loading = false;
	});
</script>

<main>
	<!-- <Auth useRedirect={true} let:user let:loggedIn let:loginWithGoogle let:logout> -->
	<!-- {#if loggedIn} -->
	{#if loading}
		<div class="absolute flex items-center justify-center">Loading...</div>
	{:else}
		<div in:fade>
			<nav class="mt-4">
				<ul class="flex flex-row justify-end text-gray-400">
					<li class="cursor-pointer mr-6 hover:text-white">Invite someone</li>
					<li class="cursor-pointer mr-6 hover:text-white">Kaizen Labs</li>
					<!-- {#if user} -->
					<!-- <li on:click={logout} class="cursor-pointer mr-6 hover:text-white">Sign out</li> -->
					<!-- {:else}
						<li class="cursor-pointer mr-6 hover:text-white">
							<a href="/sign-in" class=""> Sign in </a>
						</li>
					{/if} -->
				</ul>
			</nav>
			<slot />
		</div>
	{/if}
	<!-- {:else} -->
	<!-- <button type="button" on:click|preventDefault={loginWithGoogle}> Sign In with Google </button> -->
	<!-- {/if} -->
	<!-- </Auth> -->
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
