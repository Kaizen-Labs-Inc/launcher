<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { addToast } from '../../stores/toaststore';
	import { fade } from 'svelte/transition';
	import Button from '../../components/Button.svelte';
	import type GoogleUser from '../../model/api/GoogleUser';
	import { userStore } from '../../stores/userStore';
	import { isEmptyOrSpaces } from '../../utils/isEmptyOrSpaces';
	import ConfettiGenerator from 'confetti-js';

	let user: GoogleUser;
	let workspaceName: string = '';
	const workspaceNameRegex: string = '/^[a-z0-9]+$/i';
	const regex = new RegExp(workspaceName);
	userStore.subscribe((value) => {
		user = value;
	});

	const isValidWorkspaceName = (): boolean => {
		console.log(regex.test(workspaceName));
		if (regex.test(workspaceName)) {
			return true;
		} else {
			return false;
		}
	};

	const handleContinue = () => {
		if (isValidWorkspaceName) {
			goto('/home');
		} else {
			addToast({
				dismissible: false,
				message: 'Please choose a different name',
				type: 'error',
				timeout: 3000
			});
		}
	};

	onMount(() => {
		const confettiSettings = { target: 'my-canvas', respawn: false, rotate: true };
		const confetti = new ConfettiGenerator(confettiSettings);
		confetti.render();
	});
</script>

<div class="flex flex-col justify-center items-center mt-24 z-50 relative">
	<img src={user.picture} alt={user.name} class="rounded-full" />
	<h1 class="mt-8 text-4xl font-medium text-center">🎉 Hi, {user.given_name}</h1>
	<h2 class="mt-8 opacity-75 text-2xl text-center">
		Welcome to your free trial. Get started by telling us a bit about your team.
	</h2>
	<form class="mt-10">
		<div class="flex flex-col justify-start">
			<label class="mb-1" for="workspaceName">What's the name of your team?</label>
			<input
				bind:value={workspaceName}
				name="workspaceName"
				type="text"
				autofocus
				pattern={workspaceNameRegex}
				required
				placeholder="Your team's name"
				class="bg-white bg-opacity-10 rounded p-2 outline-none text-xl"
			/>
		</div>
		<Button label="Continue" disabled={isEmptyOrSpaces(workspaceName)} on:click={handleContinue} />
	</form>
	{#if workspaceName}
		<div transition:fade class="mt-2 text-base">
			Your own Launcher URL:<span class="opacity-50 ml-2">
				{workspaceName.replace(/\s+/g, '-').toLowerCase()}.launcher.team</span
			>
		</div>
	{/if}
</div>

<canvas on:click|preventDefault id="my-canvas" class="z-10 absolute top-0 left-0" />
