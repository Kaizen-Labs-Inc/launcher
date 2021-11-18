<script lang="ts">
	import { goto } from '$app/navigation';

	import { session } from '$app/stores';
	import { signOut } from 'sk-auth/client';

	let user;

	session.subscribe((value) => {
		console.log(value);
		user = value?.user?.connections?.google;
	});

	const logout = () => {
		signOut();
		session.set(undefined);
		goto('/');
	};
</script>

<div class="flex flex-col justify-center items-center mt-16">
	<img src={user.picture} class="rounded-full" />
	<div class="mt-4 text-xl">{user.name}</div>
	<div class="opacity-50 mt-1">{user.email}</div>
	<div
		on:click={logout}
		class="rounded px-4 py-1 text-lg bg-white flex items-center justify-center text-black cursor-pointer mt-4"
	>
		Sign out
	</div>
</div>
