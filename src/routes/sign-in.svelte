<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
	import { goto } from '$app/navigation';
	const auth = getAuth();
	const provider = new GoogleAuthProvider();
	const handleAuth = () => {
		provider.addScope('profile');
		provider.addScope('email');
		signInWithRedirect(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};
	onMount(() => {
		const user = auth.currentUser;
		if (user) {
			goto('/');
		}
	});
</script>

<svelte:head>
	<title>Springboard - Sign in</title>
</svelte:head>
<div class="container mx-auto flex text-center">
	<div
		on:click={handleAuth}
		class="cursor-pointer p-4 text-xl mx-auto mt-24 font-medium bg-white rounded text-black flex transition duration-200 ease-in-out hover:-translate-y-1"
	>
		<img src="../icons/google-g.svg" alt="Google G" class="mr-3" />Sign in with Google
	</div>
</div>
