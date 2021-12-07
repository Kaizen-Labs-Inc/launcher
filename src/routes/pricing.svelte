<script>
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import Button from '../components/Button.svelte';
	import { CheckIcon } from 'svelte-feather-icons';
	onMount(() => {
		window.analytics.page();
	});
</script>

<h1 class="font-bold text-5xl md:text-8xl mt-24 text-center">Get started for free</h1>
<h2 class=" mt-12  text-center">
	<span class="opacity-80 text-3xl">Simple, no-fuss per-seat pricing.</span><span
		class="rounded-lg ml-4 text-lg px-3 py-1 font-medium uppercase bg-gradient-to-r from-pink-400 to-purple-500"
		>Limited time free trial</span
	>
</h2>
<section class="mt-16 flex flex-row justify-center items-start">
	<div class="bg-white bg-opacity-5 rounded-tl rounded-bl p-6 mx-4">
		<h2 class="text-2xl font-medium mb-2">Solo</h2>
		<div class="mt-4 opacity-60">Free forever</div>
		<ul>
			<li class="flex items-center my-3">
				<CheckIcon strokeWidth="1" size="18" /><span class="ml-2">1 user</span>
			</li>
			<li class="flex items-center my-3">
				<CheckIcon strokeWidth="1" size="18" /><span class="ml-2">Google auth</span>
			</li>
			<li class="flex items-center my-3">
				<CheckIcon strokeWidth="1" size="18" /><span class="ml-2">Add your own apps</span>
			</li>
			<li class="flex items-center my-3">
				<CheckIcon strokeWidth="1" size="18" /><span class="ml-2">Upgrade anytime</span>
			</li>
		</ul>
		<Button
			label="Sign up"
			on:clicked={() => {
				goto('/sign-in');
				analytics.track('Pricing CTA Clicked', {
					plan: 'Solo'
				});
			}}
		/>

		<div class="mt-3 opacity-40 text-center">Free forever</div>
	</div>
	<div class="bg-white bg-opacity-5 rounded-tl rounded-bl p-6 mx-4">
		<h2 class="text-2xl font-medium mb-2">Team</h2>
		<div class="mt-4 opacity-60">$4 per user per month</div>
		<ul>
			<li class="flex items-center my-3">
				<CheckIcon strokeWidth="1" size="18" /><span class="ml-2">Unlimited users</span>
			</li>
			<li class="flex items-center my-3">
				<CheckIcon strokeWidth="1" size="18" /><span class="ml-2">Google auth</span>
			</li>
			<li class="flex items-center my-3">
				<CheckIcon strokeWidth="1" size="18" /><span class="ml-2">Shared + private apps</span>
			</li>
			<li class="flex items-center my-3">
				<CheckIcon strokeWidth="1" size="18" /><span class="ml-2">14-day free trial</span>
			</li>
			<li class="flex items-center my-3">
				<CheckIcon strokeWidth="1" size="18" /><span class="ml-2">Cancel anytime</span>
			</li>
		</ul>
		<Button
			label="Get started"
			on:clicked={() => {
				goto('/welcome');
				analytics.track('Pricing CTA Clicked', {
					plan: 'Team'
				});
			}}
		/>
		<div class="mt-3 opacity-40 text-center">Paid annually</div>
	</div>
	<div class="bg-white bg-opacity-5 rounded-tl rounded-bl p-6 mx-4">
		<h2 class="text-2xl font-medium mb-2">Enterprise</h2>
		<ul>
			<li class="flex items-center my-3">
				<CheckIcon strokeWidth="1" size="18" /><span class="ml-2">Unlimited users</span>
			</li>
			<li class="flex items-center my-3">
				<CheckIcon strokeWidth="1" size="18" /><span class="ml-2">Bring your own auth</span>
			</li>
			<li class="flex items-center my-3">
				<CheckIcon strokeWidth="1" size="18" /><span class="ml-2">Advanced security & control</span>
			</li>
			<li class="flex items-center my-3">
				<CheckIcon strokeWidth="1" size="18" /><span class="ml-2">Dedicated support</span>
			</li>
			<li class="flex items-center my-3">
				<CheckIcon strokeWidth="1" size="18" /><span class="ml-2">Custom contract</span>
			</li>
		</ul>
		<Button
			label="Email us"
			on:clicked={() => {
				location = 'mailto:jordan@kaizenlabs.dev';
				analytics.track('Pricing CTA Clicked', {
					plan: 'Enterprise'
				});
			}}
		/>

		<div class="mt-3 opacity-40 text-center">Let's figure it out together</div>
	</div>
</section>
