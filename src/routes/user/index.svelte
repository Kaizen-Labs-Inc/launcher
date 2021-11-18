<script lang="ts">
	import { getGoogleUser } from '$lib/getGoogleUser';
	import { logout } from '$lib/logout';

	const user = getGoogleUser();
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
