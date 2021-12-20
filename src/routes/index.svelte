<script lang="ts">
	import { onMount } from 'svelte';
	import { userStore } from '../stores/userStore';
	import { goto } from '$app/navigation';
	import {
		CodeIcon,
		CommandIcon,
		GridIcon,
		LockIcon,
		UsersIcon,
		ZapIcon
	} from 'svelte-feather-icons';
	import ScrollingChannelIconBackground from '../components/ScrollingChannelIconBackground.svelte';
	let demoCtaIsHovered = false;
	let pricingCtaIsHovered = false;
	userStore.subscribe((value) => {
		if (value.user) {
			goto('/home');
		}
	});
	onMount(() => {
		window.analytics.page();
	});
</script>

<svelte:head>
	<title>Launcher - a home screen for your growing team</title>
</svelte:head>
<ScrollingChannelIconBackground />
<div class="container mx-auto">
	<div class="text-center mt-24 flex flex-col">
		<h1 class="font-bold text-5xl md:text-8xl z-20" style="line-height: 115%">
			A home screen for your growing team.
		</h1>
		<h2 class="text-3xl mt-12 opacity-80 z-20">Shared shortcuts to your team's daily apps.</h2>
		<div class="flex sm:flex-row flex-col justify-center items-top mt-16 z-20">
			<div class="flex flex-col sm:mx-4 my-4 sm:my-0">
				<div
					on:focus
					on:blur
					on:mouseover={() => {
						demoCtaIsHovered = true;
					}}
					on:mouseout={() => {
						demoCtaIsHovered = false;
					}}
					on:click={() => {
						goto('/demo');
					}}
					class="cta mx-auto rounded-md cursor-pointer text-2xl font-medium py-3 px-6 flex items-center justify-center text-black"
				>
					Play with the demo
				</div>
				<div class="mt-3 {demoCtaIsHovered ? 'opacity-100' : 'opacity-60'}">
					No sign-up required 🙂
				</div>
			</div>
			<div class="mx-4">
				<div
					on:focus
					on:blur
					on:mouseover={() => {
						pricingCtaIsHovered = true;
					}}
					on:mouseout={() => {
						pricingCtaIsHovered = false;
					}}
					on:click={() => {
						goto('/pricing');
					}}
					class="bg-white bg-opacity-5 hover:bg-opacity-10 rounded-md cursor-pointer text-2xl font-medium py-3 px-6 flex items-center justify-center"
				>
					See pricing
				</div>
				<div class="mt-3 {pricingCtaIsHovered ? 'opacity-100' : 'opacity-60'}">
					Limited-time free trial
				</div>
			</div>
		</div>
	</div>

	<h3 class="text-5xl font-medium text-center mt-36 w-2/3 mx-auto">
		The "new tab" page for your company.
	</h3>
	<h4 class="text-2xl mt-10 opacity-60 text-center mx-auto">
		Launcher wrangles the apps your company uses (like GitHub, Notion, and Asana) and makes them
		beautiful and accessible. Perfect for new hires and growing teams.
	</h4>
	<div class="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
		<div
			class="rounded-2xl bg-black text-white bg-opacity-30 backdrop-blur-md p-8 flex flex-col items-center text-center"
		>
			<div
				class="rounded-xl text-black bg-gradient-to-b from-red-200 to-blue-100 flex items-center justify-center p-3"
			>
				<ZapIcon size="28" strokeWidth="1.25" />
			</div>
			<div class="font-bold text-2xl text-white my-4">Real fast.</div>
			<span class="opacity-75">Built with performance as a first-class-citizen.</span>
		</div>
		<div
			class="rounded-2xl bg-black text-white bg-opacity-30 backdrop-blur-md p-8 flex flex-col items-center text-center"
		>
			<div
				class="rounded-xl text-black bg-gradient-to-b from-yellow-300 to-green-100 flex items-center justify-center p-3"
			>
				<CommandIcon size="28" strokeWidth="1.25" />
			</div>
			<div class="font-bold text-2xl text-white my-4">Keyboard friendly.</div>
			<span class="opacity-75">Find and launch any app in milliseconds with ⌘G.</span>
		</div>
		<div
			class="rounded-2xl bg-black text-white bg-opacity-30 backdrop-blur-md p-8 flex flex-col items-center text-center"
		>
			<div
				class="rounded-xl text-black bg-gradient-to-b from-red-200 to-pink-300 flex items-center justify-center p-3"
			>
				<UsersIcon size="28" strokeWidth="1.25" />
			</div>
			<div class="font-bold text-2xl text-white my-4">Pay as you grow.</div>
			<span class="opacity-75">Simple, fair, per-user pricing. Cancel anytime.</span>
		</div>
		<div
			class="rounded-2xl bg-black text-white bg-opacity-30 backdrop-blur-md p-8 flex flex-col items-center text-center"
		>
			<div
				class="rounded-xl text-black bg-gradient-to-b from-blue-300 to-indigo-100 flex items-center justify-center p-3"
			>
				<CodeIcon size="28" strokeWidth="1.25" />
			</div>
			<div class="font-bold text-2xl text-white my-4">Open source.</div>
			<span class="opacity-75">Peek under the hood, or host it yourself.</span>
		</div>
		<div
			class="rounded-2xl bg-black text-white bg-opacity-30 backdrop-blur-md p-8 flex flex-col items-center text-center"
		>
			<div
				class="rounded-xl text-black bg-gradient-to-b from-purple-300 to-pink-100 flex items-center justify-center p-3"
			>
				<LockIcon size="28" strokeWidth="1.25" />
			</div>
			<div class="font-bold text-2xl text-white my-4">Private.</div>
			<span class="opacity-75">We don't track, store, or sell your data.</span>
		</div>
		<div
			class="rounded-2xl bg-black text-white bg-opacity-30 backdrop-blur-md p-8 flex flex-col items-center text-center"
		>
			<div
				class="rounded-xl text-black bg-gradient-to-b from-pink-300 to-green-200 flex items-center justify-center p-3"
			>
				<GridIcon size="28" strokeWidth="1.25" />
			</div>
			<div class="font-bold text-2xl text-white my-4">Yours.</div>
			<span class="opacity-75">Use and browse our apps, or add your own.</span>
		</div>
	</div>
</div>

<style>
	h1 {
		background: #2980b9; /* fallback for old browsers */
		background: -webkit-linear-gradient(
			to right,
			#ffffff,
			#6dd5fa,
			#2980b9
		); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to right,
			#ffffff,
			#6dd5fa,
			#2980b9
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.cta {
		background-color: #85ffbd;
		background-image: linear-gradient(45deg, #85ffbd 0%, #fffb7d 100%);
		width: fit-content;
	}

	.icon {
		width: 120px;
		height: 120px;
		border: 1px solid white;
		border-radius: 40px;
	}
	.icon:nth-child(2n) {
		animation-name: keyframes1;
		animation-iteration-count: infinite;
		transform-origin: 50% 10%;
	}

	.icon:nth-child(2n-1) {
		animation-name: keyframes2;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		transform-origin: 30% 5%;
	}

	@keyframes keyframes1 {
		0% {
			transform: rotate(-1deg);
			animation-timing-function: ease-in;
		}

		50% {
			transform: rotate(1.5deg);
			animation-timing-function: ease-out;
		}
	}

	@keyframes keyframes2 {
		0% {
			transform: rotate(1deg);
			animation-timing-function: ease-in;
		}

		50% {
			transform: rotate(-1.5deg);
			animation-timing-function: ease-out;
		}
	}
</style>
