<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { initializeApp } from 'firebase/app';
	// import { getAnalytics } from 'firebase/analytics';
	import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	let auth;
	let user;
	const firebaseConfig = {
		apiKey: 'AIzaSyAV4OMbmBAmlQXc0HKZYqlN95rmeSH-cAY',
		authDomain: 'springboard-launcher.firebaseapp.com',
		projectId: 'springboard-launcher',
		storageBucket: 'springboard-launcher.appspot.com',
		messagingSenderId: '190518399300',
		appId: '1:190518399300:web:769e8cc7c1b82381f08711',
		measurementId: 'G-7FF7NJNV2R'
	};

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				goto('/sign-in');
			})
			.catch((error) => {
				console.error(error);
			});
	};

	onMount(() => {
		const app = initializeApp(firebaseConfig);
		// const analytics = getAnalytics(app);

		auth = getAuth();
		user = auth.currentUser;
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				// ...
			} else {
				goto('/sign-in');
			}
		});
	});
</script>

<main>
	<nav class="mt-4">
		<ul class="flex flex-row justify-end text-gray-400">
			<li class="cursor-pointer mr-6 hover:text-white">Invite someone</li>
			<li class="cursor-pointer mr-6 hover:text-white">Kaizen Labs</li>
			{#if user}
				<li on:click={handleSignOut} class="cursor-pointer mr-6 hover:text-white">Sign out</li>
			{:else}
				<li
					on:click={() => {
						goto('/sign-in');
					}}
					class="cursor-pointer mr-6 hover:text-white"
				>
					Sign in
				</li>
			{/if}
		</ul>
	</nav>
	<slot />
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
