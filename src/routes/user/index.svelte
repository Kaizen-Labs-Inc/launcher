<script lang="ts">
	import { session } from '$app/stores';
	import { signOut } from 'sk-auth/client';

	let user;

	session.subscribe((value) => {
		console.log(value);
		user = value?.user?.connections?.google;
	});
</script>

hello {user.name}
