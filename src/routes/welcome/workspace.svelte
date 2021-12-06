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
	userStore.subscribe((value) => {
		user = value;
	});
	let confetti;
	let workspaceName: string = '';
	let workspaceDomain: string = user.email.split('@').pop();

	const handleContinue = () => {
		// TODO handle workspace name validation server-side
		confetti.clear();
		goto('/welcome/invite');
	};

	onMount(() => {
		const confettiSettings = { target: 'my-canvas', respawn: false, rotate: true };
		confetti = new ConfettiGenerator(confettiSettings);
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
				required
				placeholder="Your team's name"
				class="bg-white bg-opacity-10 rounded p-2 outline-none text-xl"
			/>
		</div>
		{#if !isEmptyOrSpaces(workspaceName)}
			<div in:fade class="flex flex-col justify-start mt-4">
				<label class="mb-1" for="workspaceName">Primary email domain of team</label>
				<input
					bind:value={workspaceDomain}
					name="workspaceDomain"
					type="text"
					required
					placeholder={workspaceDomain}
					class="bg-white bg-opacity-10 rounded p-2 outline-none text-xl"
				/>
			</div>
			<div class="flex flex-row items-center mt-4 mb-8">
				<label>
					<input type="checkbox" checked />
					Restrict sign-ups to those with a <span class="font-bold">{workspaceDomain}</span> email address
				</label>
			</div>
			<Button
				label="Continue"
				disabled={isEmptyOrSpaces(workspaceName)}
				on:clicked={handleContinue}
			/>
		{/if}
	</form>
	{#if workspaceName}
		<div in:fade class="mt-2 text-base">
			Your own Launcher URL:<span class="opacity-50 ml-2">
				{workspaceName.replace(/\s+/g, '-').toLowerCase()}.launcher.team</span
			>
		</div>
	{/if}
</div>

<canvas id="my-canvas" class="z-10 absolute top-0 left-0" />
