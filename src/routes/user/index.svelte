<script lang="ts">
	import { session } from '$app/stores';
	import { signOut } from 'sk-auth/client';

	let user;

	session.subscribe((value) => {
		console.log(value);
		user = value?.user?.connections?.google;
	});
</script>

<div class="flex flex-col justify-center items-center mt-16">
	<img src={user.picture} class="rounded-full" />
	<div class="mt-4 text-xl">{user.name}</div>
	<div class="opacity-50 mt-1">{user.email}</div>
</div>
